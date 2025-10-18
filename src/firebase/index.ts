
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// Initialize Firebase for client-side usage
function initializeFirebaseClient() {
  if (!global.window) {
    throw new Error('Firebase client should only be initialized in the browser.');
  }
  const apps = getApps();
  if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = apps[0];
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

// Get Firebase instances for server-side usage (e.g., Server Actions)
function initializeFirebaseServer() {
    const apps = getApps();
    if (!apps.length) {
        firebaseApp = initializeApp(firebaseConfig);
    } else {
        firebaseApp = apps[0];
    }
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);

    return { firebaseApp, auth, firestore };
}

// This function should be used in client components/hooks
export function getFirebaseClient() {
    // To avoid multiple initializations
    if (firebaseApp && auth && firestore) {
        return { firebaseApp, auth, firestore };
    }
    return initializeFirebaseClient();
}

// This function should be used in server actions/components
export function getFirebaseServer() {
    // In a server environment, we might re-initialize every time
    // depending on the execution context. For now, simple initialization is fine.
    return initializeFirebaseServer();
}
