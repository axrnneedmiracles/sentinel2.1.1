
'use client';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import { getFirebaseClient } from '.';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  const { firebaseApp, auth, firestore } = useMemo(() => {
    if (typeof window !== 'undefined') {
      const client = getFirebaseClient();
      setIsFirebaseInitialized(true);
      return client;
    }
    return { firebaseApp: null, auth: null, firestore: null };
  }, []);

  // Don't render children until Firebase is initialized on the client.
  if (!isFirebaseInitialized || !firebaseApp || !auth || !firestore) {
    // You can render a loading spinner here if you want.
    // Returning null for now to prevent child components from rendering prematurely.
    return null;
  }

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
