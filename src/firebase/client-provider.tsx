
'use client';
import { ReactNode, useState, useEffect } from 'react';
import { getFirebaseClient } from '.';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<{
    firebaseApp?: FirebaseApp;
    auth?: Auth;
    firestore?: Firestore;
  }>({});

  useEffect(() => {
    // getFirebaseClient only works on the client, so we call it in useEffect.
    const { firebaseApp, auth, firestore } = getFirebaseClient();
    setFirebase({ firebaseApp, auth, firestore });
  }, []);

  // Avoid rendering children until Firebase is initialized on the client.
  if (!firebase.firebaseApp || !firebase.auth || !firebase.firestore) {
    return null;
  }

  return (
    <FirebaseProvider firebaseApp={firebase.firebaseApp} auth={firebase.auth} firestore={firebase.firestore}>
      {children}
    </FirebaseProvider>
  );
}
