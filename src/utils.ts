import { firestore } from "firebase-admin"
import { DBUser } from "./models"

const converter = <T>() => ({
  toFirestore: (data: T) : FirebaseFirestore.DocumentData => {
    return data as unknown as FirebaseFirestore.DocumentData;
  },
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T
})

const dataPoint = <T>(collectionPath: string) => 
    firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
    DBUser : dataPoint<DBUser>('users'),
}

export {db}




