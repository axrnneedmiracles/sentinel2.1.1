
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Report } from '@/lib/types';
import { useIsMounted } from './use-is-mounted';
import type { ReportFormData } from '@/components/community/community-page';

const COMMUNITY_KEY = 'sentinel-community-reports';
const MAX_REPORTS = 100;

export function useCommunity() {
  const [reports, setReports] = useState<Report[]>([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      try {
        const storedReports = window.localStorage.getItem(COMMUNITY_KEY);
        if (storedReports) {
          setReports(JSON.parse(storedReports));
        }
      } catch (error) {
        console.error('Could not load community reports from localStorage', error);
      }
    }
  }, [isMounted]);
  
  const saveReports = useCallback((updatedReports: Report[]) => {
      if (isMounted) {
        try {
          window.localStorage.setItem(COMMUNITY_KEY, JSON.stringify(updatedReports));
        } catch (error) {
          console.error('Could not save community reports to localStorage', error);
        }
      }
      setReports(updatedReports);
  }, [isMounted]);

  const addReport = useCallback((reportData: ReportFormData) => {
    const newReport: Report = {
      ...reportData,
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      time: new Date().toISOString(),
      author: 'You'
    };

    setReports(prevReports => {
      const updatedReports = [newReport, ...prevReports].slice(0, MAX_REPORTS);
      saveReports(updatedReports);
      return updatedReports;
    });
  }, [saveReports]);
  
  const deleteReport = useCallback((reportId: string) => {
    setReports(prevReports => {
        const updatedReports = prevReports.filter(report => report.id !== reportId);
        saveReports(updatedReports);
        return updatedReports;
    });
  }, [saveReports]);

  const clearReports = useCallback(() => {
    setReports([]);
    if(isMounted) {
      try {
          window.localStorage.removeItem(COMMUNITY_KEY);
      } catch (error) {
          console.error('Could not clear community reports from localStorage', error);
      }
    }
  }, [isMounted]);

  return { reports, addReport, deleteReport, clearReports, isLoaded: isMounted };
}
