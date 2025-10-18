
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// This function should be used in client components/hooks
export function getFirebaseClient() {
    const apps = getApps();
    let firebaseApp: FirebaseApp;

    if (!apps.length) {
        firebaseApp = initializeApp(firebaseConfig);
    } else {
        firebaseApp = apps[0];
    }
    
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    
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
