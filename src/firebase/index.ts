
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

// This function should ONLY be used in client components/hooks
export function getFirebaseClient() {
    if (typeof window === 'undefined') {
        // Return undefined on the server
        return { firebaseApp: undefined, auth: undefined, firestore: undefined };
    }

    if (!firebaseApp) {
        const apps = getApps();
        if (!apps.length) {
            firebaseApp = initializeApp(firebaseConfig);
        } else {
            firebaseApp = apps[0];
        }
        auth = getAuth(firebaseApp);
        firestore = getFirestore(firebaseApp);
    }
    
    return { firebaseApp, auth, firestore };
}
