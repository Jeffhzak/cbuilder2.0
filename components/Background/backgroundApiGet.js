import axios from "axios";

export const backgroundApiGet = async (backgroundName) => {
    //! Base Info
    const URL = "https://www.dnd5eapi.co";
    const res = await axios.get(`${URL}/api/backgrounds/${backgroundName}`);

    const backgroundInfo = res.data;

    delete backgroundInfo.starting_equipment;
    delete backgroundInfo.starting_equipment_options;

    return backgroundInfo;
}