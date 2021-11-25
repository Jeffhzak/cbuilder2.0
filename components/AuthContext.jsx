import { useContext, createContext, useState, useEffect } from 'react'
import { auth, findMyCharacters, findMyCustomBGs, getUserData } from '../firebase/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    updateDoc,
    increment,
    where,
    query,
    deleteField,
  } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const db = getFirestore();


export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    

    const signup = async (email, password, user_name) => {
        return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            const lowerEmail = email.toLowerCase();
            setDoc(doc(db, "users", `${lowerEmail}`), {
                user_name: `${user_name}`,
                email: `${lowerEmail}`,
                uid: userCredentials.user.uid,
            });
        })
    }

    const login = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user)
            // console.log("useEffect from authcontext: ", user);
            
            //! Pulls userData from firestore
            if (user) {

                const fetchedUserData = await getUserData(user);

                const characterArray = await findMyCharacters(user);

                const bgArray = await findMyCustomBGs(user);
                
                setUserData({
                    userName: fetchedUserData.user_name,
                    characters: characterArray,
                    custom_backgrounds: bgArray,
                });
            }

            setLoading(false);
        });

        return unsubscribe;
    }, [])


    const value = {
        currentUser,
        userData,
        setUserData,
        signup,
        login,
        logout,
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : null}
        </AuthContext.Provider>
    )
}
