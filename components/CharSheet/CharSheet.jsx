import { Button, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useAuth } from "../../components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { saveCharacter, findMyCharacters, updateCharacter } from '../../firebase/firebase';
import { useAtom } from 'jotai'
import { tempCharacterAtom } from '../../pages/create'
import { SummaryCard } from './components/SummaryCard';
import { Box } from '@mui/system';
import { useState } from 'react';
import { FromStats } from './tabs/FromStats';
import { FromClass } from './tabs/FromClass';
import { FromRace } from './tabs/FromRace';
import { FromBG } from './tabs/FromBG';



export const CharSheet = () => {

    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
            <Box sx={{ p: 3 }}>
            {children}
            </Box>
        )}
        </div>
    );
    }
    function allyProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }
    
    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);
    const [conMod, setConMod] = useState(0);

    const allProficiencies = [];
    const profObject = {
        classDefProfs: tempCharacter?.fromClass?.selectedClassInfo.proficiencies,
        classChooseProfs: tempCharacter?.fromClass?.proficiencies,
        raceDefProfs: tempCharacter?.fromRace?.selectedRaceInfo.starting_proficiencies,
        raceChooseProfs: tempCharacter?.fromRace?.proficiencies,
        bgDefProfs: tempCharacter?.fromBackground.selectedBGInfo?.starting_proficiencies,
        bgChooseProfs: tempCharacter?.fromBackground?.proficiencies
    }

    for (const thisProf in profObject) {
        // console.log(profObject[thisProf]);
        if (profObject[thisProf]?.length > 0 || profObject[thisProf] !== undefined ) {
            allProficiencies.push(...profObject[thisProf])
        }
    }

    console.log(allProficiencies)


    //* temp stuff
    //? temp stuff
    //! temp stuff 
    const { currentUser, userData, setUserData } = useAuth();

    const handleSave = async () => {
        await saveCharacter(tempCharacter, currentUser);
        setTempCharacter({
            fromClass: {},
            fromRace: {},
            fromBackground: {},
            baseStats: {},
            name: "Placeholder",
          })
        const characterArray = await findMyCharacters(currentUser);
        setUserData(
            {
                ...userData,
                characters: characterArray,
            }
            );
    }
    const handleUpdate = () => {
        console.log("handleUpdate triggered")
        updateCharacter(
            {
                uid: "000461c7-9f6c-4d9e-96fe-3ed9c9e991ac",
                test: "hi",
            }
        )
    }
    //* temp stuff
    //? temp stuff
    //! temp stuff 
    return (
        <>
            <h1>CharSheet.jsx</h1>
            <Button color="secondary" variant="outlined" onClick={handleSave}>Save Character</Button>
            <Button variant="contained" onClick={handleUpdate}>test update</Button>
            <Button variant="contained" onClick={()=>{console.log(tempCharacter)}}>log char</Button>
            <Button variant="contained" onClick={()=>{console.log(conMod)}}>log conMod</Button>


            <SummaryCard characterData={tempCharacter} setTempCharacter={setTempCharacter} />

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Stats & Summary" {...allyProps(0)} />
                    <Tab label="Class" {...allyProps(1)} />
                    <Tab label="Race" {...allyProps(2)} />
                    <Tab label="Background" {...allyProps(3)} />
                    </Tabs>
                </Box> 
                <TabPanel value={tabValue} index={0}>
                    <FromStats tempCharacter={tempCharacter} conMod={conMod} setConMod={setConMod}/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <FromClass tempCharacter={tempCharacter}/>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <FromRace tempCharacter={tempCharacter}/>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <FromBG tempCharacter={tempCharacter}/>
                </TabPanel>
            </Box>
        </>
    )
}
