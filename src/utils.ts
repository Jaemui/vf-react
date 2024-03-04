import { firestore } from "./config/firebase"
import { getFirestore, doc, setDoc, collection, DocumentData, 
    QueryDocumentSnapshot  } from 'firebase/firestore';
import { DBUser } from "./models"


const converter = <T>() => ({
    toFirestore: (data: T): DocumentData => {
      // Ensure your data is compatible with Firestore's expected types
      return data as unknown as DocumentData;
    },
    fromFirestore: (snap: QueryDocumentSnapshot): T => {
      // Directly use the data as T assuming it matches your expected structure
      return snap.data() as T;
    },
    });

const dataPoint = <T>(collectionPath: string) => {
    return collection(firestore, collectionPath).withConverter(converter<T>());
    };
  

const db = {
    DBUser : dataPoint<DBUser>('users'),
}

export {db}




