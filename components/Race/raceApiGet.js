import axios from "axios";

export const raceApiGet = async (raceName) => {
    //! Base Info
    const URL = "https://www.dnd5eapi.co";
    const res = await axios.get(`${URL}/api/races/${raceName}`);

    const baseInfo = res.data;
    // console.log(baseInfo)

    //! Traits Info
    const traitsInfoArray = [];
    for (const arrayStep of baseInfo.traits) {
        const traitsInfoURL = `${URL}${arrayStep.url}`;
        const traitInfo = await axios.get(traitsInfoURL);
        traitsInfoArray.push(traitInfo.data);
    } 
    // console.log(traitsInfoArray)

    baseInfo.traits = traitsInfoArray;

    return baseInfo;
}