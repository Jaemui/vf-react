import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore } from 'firebase/firestore';

//Firbease Initializers 
const app = initializeApp(getFirebaseConfig());
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth};