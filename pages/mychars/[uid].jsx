import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../components/AuthContext';

const ThisChar = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {uid} = router.query;
    const arrayIndex = userData.characters.findIndex((arrayStep) => {
        if (arrayStep.uid === uid) return true;
    })
    // console.log(arrayIndex);
    const thisChar = userData.characters[arrayIndex];

    return(
        <>
        <h1>UID: {uid}</h1>
        <h1>{thisChar.name}</h1>
        </>
    )
}

export default ThisChar;