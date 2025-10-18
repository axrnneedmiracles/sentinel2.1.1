
'use client';
import { ReactNode } from 'react';
import { getFirebaseClient } from '.';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const { firebaseApp, auth, firestore } = getFirebaseClient();

  // On the server, this will be undefined, and we'll render nothing.
  // On the client, this will be defined, and we'll render the provider.
  // This avoids trying to initialize Firebase on the server.
  if (!firebaseApp) {
    return null;
  }

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
