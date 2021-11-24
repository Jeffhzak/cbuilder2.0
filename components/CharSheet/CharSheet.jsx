import { Button } from '@mui/material'
import React from 'react'
import { useAuth } from "../../components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { saveCharacter, findMyCharacters, updateCharacter } from '../../firebase/firebase';
import { useAtom } from 'jotai'
import { tempCharacterAtom } from '../../pages/create'
import { SummaryCard } from './components/SummaryCard';



export const CharSheet = () => {
    
    const { currentUser, userData, setUserData } = useAuth();
    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);

    const charName = tempCharacter?.name;
    const charRace = tempCharacter?.fromRace?.selectedRaceInfo?.name ?? "<Race>";
    const charClass = tempCharacter?.fromClass?.selectedClassInfo?.class?.name ?? "<Class>";
    const portraitURL = tempCharacter?.image_url;

    const handleSave = async () => {
        await saveCharacter(tempCharacter, currentUser);
        setTempCharacter({
            fromClass: {},
            fromRace: {},
            fromBackground: {},
            baseStats: {},
            name: "Placeholder",
          })
        const characterArray = await findMyCharacters(currentUser);
        setUserData(
            {
                ...userData,
                characters: characterArray,
            }
            );
    }
    const handleUpdate = () => {
        console.log("handleUpdate triggered")
        updateCharacter(
            {
                uid: "000461c7-9f6c-4d9e-96fe-3ed9c9e991ac",
                test: "hi",
            }
        )
    }
    return (
        <>
            <h1>CharSheet.jsx</h1>
            <Button color="secondary" variant="outlined" onClick={handleSave}>Save Character</Button>
            <Button variant="contained" onClick={handleUpdate}>test update</Button>
            <Button variant="contained" onClick={()=>{console.log(tempCharacter)}}>log char</Button>
            
            <SummaryCard characterData={tempCharacter} setTempCharacter={setTempCharacter} />
        </>
    )
}
