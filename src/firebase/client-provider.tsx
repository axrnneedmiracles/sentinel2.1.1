'use client';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { ReactNode, useMemo } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const { firebaseApp, auth, firestore } = useMemo(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    return { firebaseApp, auth, firestore };
  }, []);

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
