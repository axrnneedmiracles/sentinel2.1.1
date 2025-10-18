
'use client';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { createContext, useContext, type ReactNode } from 'react';

type FirebaseContextValue = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} | null;

const FirebaseContext = createContext<FirebaseContextValue>(null);

export function FirebaseProvider({
  children,
  ...value
}: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  // No error is thrown here; components should handle the null case
  return context;
}

export function useFirebaseApp() {
  return useFirebase()?.firebaseApp;
}

export function useAuth() {
  return useFirebase()?.auth;
}

export function useFirestore() {
  return useFirebase()?.firestore;
}
