
import React from 'react'
import axios from "axios";
import { skillsApiGet } from '../../../components/Stats/statsApiGet';
import CustomBackground from '.';
import { useRouter } from "next/dist/client/router";
import { useAuth } from '../../../components/AuthContext';

const CBGShow = ({allSkillsInfo}) => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();
    const {bgindex} = router.query;

    if (typeof(parseInt(bgindex)) === "number") {
        const loadedCustomBG = userData?.custom_backgrounds[bgindex];
    } else {
        const loadedCustomBG = null;
    }

    return (
        <>  
            {/* <h1>CBGShow.jsx</h1> */}
            <CustomBackground allSkillsInfo={allSkillsInfo} loadedCustomBG={loadedCustomBG}/>
        </>
    )
}

export default CBGShow;

export async function getStaticPaths() {
    return {
      paths: [
        '/custom-options/background/0',
      ],
      fallback: true,
    }
  }

export async function getStaticProps() {

    const URL = "https://www.dnd5eapi.co";

    //! Skills Info
    const skillRes = await axios.get(`${URL}/api/skills`);
    const allSkillsInfo = [];
    for (const thisSkill of skillRes.data.results) {
        const skillName = thisSkill.index;

        const thisSkillInfo = await skillsApiGet(skillName);

        allSkillsInfo.push(thisSkillInfo);
    }

    return {  
        props: {
        allSkillsInfo: allSkillsInfo,
        }
    }

}