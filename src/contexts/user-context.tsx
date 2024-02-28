import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { DBUser } from "../models"
import { AuthContext } from './firebase-context';
import { db } from "../utils"



// export interface UserContextValue {
//     currentUser: DBUser | null;
//     setCurrentUser: (user: DBUser) => void;
// };

interface UserProviderProps{
    children?: ReactNode
};

const defaultUser: DBUser = {
    email: 'email',
    userName: 'username',
    userId: 'userId'
};

// export const UserContext = createContext<UserContextValue>({
//     currentUser: defaultUser,
//     setCurrentUser: () => {},
// })

export const UserContext = createContext({
    currentDBUser: {} as DBUser | null,
    setCurrentUser: (_user:DBUser) => {},
  });

// export const getDBUser = (): DBUser => {
    
// }
export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentDBUser, setCurrentUser] = useState<DBUser | null>(defaultUser)
    const { currentUser: authUser } = useContext(AuthContext); 

    useEffect(() => {
        if (authUser) {
          // Fetch the user document from Firestore using the UID from authUser
          const userDocRef = db.DBUser.doc(authUser.uid); // Assuming db.DBUser references the 'users' collection
          userDocRef.get().then((doc) => {
            if (doc.exists) {
              setCurrentUser(doc.data() as DBUser); // Set the fetched user document as the currentUser in UserContext
            } else {
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        } else {
          setCurrentUser(null); // No user is signed in
        }
      }, [authUser]);

    const value = {
        currentDBUser,
        setCurrentUser,
    }
    
    return (
        <UserContext.Provider value={value}>{children} </UserContext.Provider>
    );
};
