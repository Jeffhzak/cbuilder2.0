import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../components/AuthContext';

const ThisChar = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {index} = router.query;
    const thisChar = userData.characters[index];

    return(
        <>
        <h1>UID: {thisChar.uid}</h1>
        <h1>{thisChar.name}</h1>
        </>
    )
}

export default ThisChar;