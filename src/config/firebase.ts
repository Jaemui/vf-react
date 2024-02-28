import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
    User,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
// import { db } from "../utils";
// import { DBUser } from '../models';

//Firbease Initializers 
const app = initializeApp(getFirebaseConfig());
export const db = getFirestore(app);
export const auth = getAuth(app);

// Classes
class DBUser {
    private userName: string;
    private email: string; 

    constructor(userName: string, email: string){
        this.email = email;
        this.userName = userName;
    }
}

//Functions 
export const signInUser = async (
    email: string, 
    password: string,
) => {
        if (!email && !password) return;
        return await signInWithEmailAndPassword(auth, email, password)
    }

export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const registerUser = async (
    email: string, 
    password: string,
    username: string
) => {
        if (!email && !password) return;
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        // const newUser: DBUser = {
        //     userId: credentials.user.uid, 
        //     email: email,
        //     userName: username 
        // };
        const newUser = new DBUser(email, username);
        await setDoc(doc(db, "users", credentials.user.uid), {...newUser})
        // try {
        //     await db.DBUser.doc(credentials.user.uid).set(newUser);
        //     console.log("User document successfully written!");
        //   } catch (error) {
        //     console.error("Error writing document: ", error);
        //   }
    }

export const signOutUser = async () => await signOut(auth);