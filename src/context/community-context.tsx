'use client';

import { createContext, useContext, ReactNode, useCallback } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useCollection } from 'react-firebase-hooks/firestore';
import type { Report } from '@/lib/types';
import type { ReportFormData } from '@/components/community/community-page';
import { useToast } from '@/hooks/use-toast';

interface CommunityContextType {
  reports: Report[];
  addReport: (reportData: ReportFormData) => void;
  deleteReport: (reportId: string) => void;
  loading: boolean;
  error?: Error;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const reportsCollection = collection(firestore, 'reports');
  const reportsQuery = query(reportsCollection, orderBy('time', 'desc'));
  
  const [reportsSnapshot, loading, error] = useCollection(reportsQuery);

  const reports = reportsSnapshot ? reportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report)) : [];

  const addReport = useCallback(async (reportData: ReportFormData) => {
    try {
      await addDoc(reportsCollection, {
        ...reportData,
        author: 'Anonymous',
        time: serverTimestamp(),
      });
      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping keep the community safe.',
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

  const deleteReport = useCallback(async (reportId: string) => {
    try {
      const reportRef = doc(firestore, 'reports', reportId);
      await deleteDoc(reportRef);
      toast({
        title: 'Report Deleted',
        description: 'The report has been removed.',
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
  
  const value = { reports, addReport, deleteReport, loading, error };

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
