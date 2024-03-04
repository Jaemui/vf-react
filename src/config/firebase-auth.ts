import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
    User,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { db } from "../utils";
import { DBUser } from '../models';
import { auth } from './firebase'; 


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
        const newUser: DBUser = {
            userId: credentials.user.uid, 
            email: email,
            userName: username 
        };
        // const newUser = new DBUser(email, username);
        // await setDoc(doc(db, "users", credentials.user.uid), {...newUser})
        registerUserinDB(newUser);
        // try {
        //     await db.DBUser.doc(credentials.user.uid).set(newUser);
        //     console.log("User document successfully written!");
        //   } catch (error) {
        //     console.error("Error writing document: ", error);
        //   }
    }
const registerUserinDB = async (userData : DBUser) => {
    // Assuming userData contains the necessary DBUser fields including a unique ID
    const userDocRef = doc(db.DBUser, String(userData.userId)); // Get a DocumentReference to the user's document

    try {
        // Set the user document with userData, applying the converter automatically
        await setDoc(userDocRef, userData);
        console.log("User successfully registered and stored in Firestore!");
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
export const signOutUser = async () => await signOut(auth);