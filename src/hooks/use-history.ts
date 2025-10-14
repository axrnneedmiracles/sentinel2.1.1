'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ScanResult, ScanHistoryItem } from '@/lib/types';

const HISTORY_KEY = 'sentinel-scan-history';
const MAX_HISTORY_ITEMS = 50;

export function useHistory() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This check ensures we only access localStorage on the client side.
    if (typeof window !== 'undefined') {
      try {
        const storedHistory = window.localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Could not load history from localStorage', error);
      }
      setIsLoaded(true);
    }
  }, []);

  const addHistoryItem = useCallback((item: ScanResult) => {
    if (item.error) return; // Don't save scans that resulted in an error

    const newItem: ScanHistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      scannedAt: new Date().toISOString(),
    };

    setHistory(prevHistory => {
      const updatedHistory = [newItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
      try {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Could not save history to localStorage', error);
      }
      return updatedHistory;
    });
  }, []);
  
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
        window.localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error('Could not clear history from localStorage', error);
    }
  }, []);

  return { history, addHistoryItem, clearHistory, isLoaded };
}
