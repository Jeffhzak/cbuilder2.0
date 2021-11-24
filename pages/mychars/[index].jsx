import { Box as div } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../components/AuthContext';

const ThisChar = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {index} = router.query;
    const thisChar = userData.characters[index];

    return(
        <div className="page_wrapper">
        <h1>UID: {thisChar.uid}</h1>
        <h1>{thisChar.name}</h1>
        </div>
    )
}

export default ThisChar;