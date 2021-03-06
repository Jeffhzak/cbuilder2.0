import { Box } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../components/AuthContext';
import { CharSheet } from "../../components/CharSheet/CharSheet";

const ThisChar = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {index} = router.query;
    const thisChar = userData.characters[index];

    const updateCharData = (tempCharacter) => {
        const uid = tempCharacter.uid;
        const newCharArray = [...userData.characters];
        const index = newCharArray.findIndex(x => x.uid === uid);
        if (index > -1) {
            newCharArray[index] = tempCharacter;
        }
        setUserData({
            ...userData,
            characters: newCharArray,
        })
    }

    const removeCharFromUser = (uid) => {
        // console.log("removeChar fired")
        const newCharArray = userData.characters.filter((character) => {
            if (character.uid !== uid) return true;
            else return false;
        })
        setUserData({
            ...userData,
            characters: newCharArray,
        })
    }

    return(
        <Box className="page_wrapper">
        {/* <h1>UID: {thisChar.uid}</h1> */}
        <CharSheet loadedChar={thisChar} removeCharFromUser={removeCharFromUser} updateCharData={updateCharData}/>
        </Box>
    )
}

export default ThisChar;