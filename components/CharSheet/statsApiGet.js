import axios from "axios";

const URL = "https://www.dnd5eapi.co";

export const statsApiGet = async (statName) => {
    //! Base Info
    const res = await axios.get(`${URL}/api/ability-scores/${statName}`)
    const statInfo = res.data;

    return statInfo;
}

export const skillsApiGet = async (skillName) => {
    //! Base Info
    const res = await axios.get(`${URL}/api/skills/${skillName}`)
    const statInfo = res.data;

    return statInfo;

}