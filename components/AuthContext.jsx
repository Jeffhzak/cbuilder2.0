import { useContext, createContext, useState } from 'react'
import { auth } from '../firebase/firebase';


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();

    // function signup(email, password) {
    //     return auth.
    // }
    const value = {
        currentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
