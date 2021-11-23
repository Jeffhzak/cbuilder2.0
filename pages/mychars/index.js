import React from 'react'
import { useAuth } from '../../components/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const Mychars = () => {

    const { currentUser, userData, setUserData } = useAuth();

    const renderCharacters = () => {
        return userData.characters.map((characterData) => {


            return (
                <>
                <h1 key={uuidv4()}>{characterData.uid}</h1>
                </>
            )
        })
    }
    
    return (
        <div>
            <h1>Mychars.jsx</h1>
            {userData?.characters?.length > 0
            ?
            renderCharacters()
            :
            <h1>You dont have any characters! Create one?</h1>
            }
        </div>
    )
}

export default Mychars;