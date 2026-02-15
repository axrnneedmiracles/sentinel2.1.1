
'use client';

import { createContext, useContext, ReactNode, useCallback } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useCollection } from 'react-firebase-hooks/firestore';
import type { Report } from '@/lib/types';
import type { ReportFormData } from '@/components/community/community-page';
import { useToast } from '@/hooks/use-toast';

interface CommunityContextType {
  reports: Report[];
  pendingReports: Report[];
  addReport: (reportData: ReportFormData) => void;
  approveReport: (reportId: string) => void;
  deleteReport: (reportId: string) => void;
  loading: boolean;
  error?: Error;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const reportsCollection = firestore ? collection(firestore as Firestore, 'reports') : null;
  // We fetch all to handle admin view. For a large app, we'd use separate queries.
  const reportsQuery = reportsCollection ? query(reportsCollection, orderBy('time', 'desc')) : null;
  
  const [reportsSnapshot, loading, error] = useCollection(reportsQuery);

  const allReports = reportsSnapshot ? reportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report)) : [];
  
  // Publicly visible reports (Approved)
  const reports = allReports.filter(r => r.isApproved);
  
  // Admin only view (Pending)
  const pendingReports = allReports.filter(r => !r.isApproved);

  const addReport = useCallback(async (reportData: ReportFormData) => {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Connection Error',
            description: 'Cannot connect to the database. Please try again.',
        });
        return;
    }
    try {
      const reportsCollection = collection(firestore, 'reports');
      await addDoc(reportsCollection, {
        ...reportData,
        author: 'Anonymous',
        time: serverTimestamp(),
        isApproved: false, // Default to false for moderation
      });
      toast({
        title: 'Report Submitted',
        description: 'Thank you! Your report is waiting for approval from an admin.',
      });
    } catch (e) {
      console.error('Error adding report:', e);
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'Could not submit your report. Please try again.',
      });
    }
  }, [firestore, toast]);

  const approveReport = useCallback(async (reportId: string) => {
    if (!firestore) return;
    try {
      const reportRef = doc(firestore, 'reports', reportId);
      await updateDoc(reportRef, { isApproved: true });
      toast({
        title: 'Report Approved',
        description: 'The report is now live in the community section.',
      });
    } catch (e) {
      console.error('Error approving report:', e);
      toast({
        variant: 'destructive',
        title: 'Approval Error',
        description: 'Could not approve the report.',
      });
    }
  }, [firestore, toast]);

  const deleteReport = useCallback(async (reportId: string) => {
     if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Connection Error',
            description: 'Cannot connect to the database. Please try again.',
        });
        return;
    }
    try {
      const reportRef = doc(firestore, 'reports', reportId);
      await deleteDoc(reportRef);
      toast({
        title: 'Report Removed',
        description: 'The report has been deleted.',
      });
    } catch (e) {
      console.error('Error deleting report:', e);
      toast({
        variant: 'destructive',
        title: 'Deletion Error',
        description: 'Could not delete the report. Please try again.',
      });
    }
  }, [firestore, toast]);
  
  const value = { reports, pendingReports, addReport, approveReport, deleteReport, loading, error };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}
