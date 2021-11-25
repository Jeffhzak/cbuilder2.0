import { Box } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../components/AuthContext';
import { CharSheet } from "../../components/CharSheet/CharSheet";

const ThisChar = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {index} = router.query;
    const thisChar = userData.characters[index];

    return(
        <Box className="page_wrapper">
        <h1>UID: {thisChar.uid}</h1>
        <h1>{thisChar.name}</h1>
        <CharSheet loadedChar={thisChar} />
        </Box>
    )
}

export default ThisChar;