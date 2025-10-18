
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { getFirebaseClient } from '.';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState<{
    firebaseApp?: FirebaseApp;
    auth?: Auth;
    firestore?: Firestore;
  } | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // This ensures Firebase is initialized before we try to use it.
    const { firebaseApp, auth, firestore } = getFirebaseClient();
    setServices({ firebaseApp, auth, firestore });
  }, []);

  // On the server and during the first client render before useEffect runs,
  // we return null. Child components that depend on the Firebase context
  // will also not render, preventing server/client mismatch and race conditions.
  if (!services || !services.firebaseApp) {
    return null; 
  }

  return (
    <FirebaseProvider firebaseApp={services.firebaseApp} auth={services.auth!} firestore={services.firestore!}>
      {children}
    </FirebaseProvider>
  );
}
