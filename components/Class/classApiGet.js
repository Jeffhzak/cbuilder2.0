import axios from "axios";

export const classApiGet = async (className) => {

    //! Base Info
    const URL = "https://www.dnd5eapi.co";
    const res = await axios.get(`${URL}/api/classes/${className}`);
    // console.log(res.data);
    const BaseInfo = res.data;
    //! cache spellcasting info
    const spellcasting = res?.data?.spellcasting;

    //! Level 1 info
    const levelInfoURL = `${URL}${res.data.class_levels}/1`
    const res2 = await axios.get(levelInfoURL);
    // console.log(res2.data);
    const Level1Info = res2.data;

    //! Feature Info
    const featureInfoArray = [];
  
      for (const arrayStep of res2.data.features) {
        const featureInfoURL = `${URL}${arrayStep.url}`;
        const featureInfo = await axios.get(featureInfoURL);
        featureInfoArray.push(featureInfo.data);
      }
    // console.log(featureInfoArray);

    Level1Info.features = featureInfoArray;
    // console.log(Level1Info);

    const combinedInfo = {...BaseInfo, ...Level1Info};
    // console.log(combinedInfo);

    const finalInfo = {
      class: combinedInfo.class,
      features: combinedInfo.features,
      hit_die: combinedInfo.hit_die,
      prof_bonus: combinedInfo.prof_bonus,
      proficiencies: combinedInfo.proficiencies,
      proficiency_choices: combinedInfo.proficiency_choices,
      saving_throws: combinedInfo.saving_throws,
      spellcasting: combinedInfo?.spellcasting ? spellcasting : null, 
    }

    // console.log(finalInfo);
    return finalInfo;
}