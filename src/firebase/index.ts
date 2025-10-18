
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth;
let firestore: Firestore;

// This function is safe to call on both server and client.
function initializeFirebase() {
  const apps = getApps();
  if (!apps.length) {
    // Initialize on client only
    if (typeof window !== 'undefined') {
      firebaseApp = initializeApp(firebaseConfig);
    }
  } else {
    firebaseApp = apps[0];
  }
  
  if (firebaseApp) {
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }
}

// Initialize on module load. This will be a no-op on the server.
initializeFirebase();

// This function should be used in client components/hooks
export function getFirebaseClient() {
    // The firebaseApp is initialized on module load on the client.
    // If it's not initialized, it means we are on the server, and we should not proceed.
    if (!firebaseApp) {
        // This will be re-initialized on the client in the provider.
        return { firebaseApp: undefined, auth: undefined, firestore: undefined };
    }
    return { firebaseApp, auth, firestore };
}

// This function should be used in server actions/components
export function getFirebaseServer() {
    const apps = getApps();
    if (!apps.length) {
       const serverApp = initializeApp(firebaseConfig);
       return {
           firebaseApp: serverApp,
           auth: getAuth(serverApp),
           firestore: getFirestore(serverApp)
       };
    }
    const serverApp = apps[0];
    return {
        firebaseApp: serverApp,
        auth: getAuth(serverApp),
        firestore: getFirestore(serverApp)
    };
}
