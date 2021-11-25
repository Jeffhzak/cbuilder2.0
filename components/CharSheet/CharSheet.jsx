import { Button, LinearProgress, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useAuth } from "../../components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { saveCharacter, findMyCharacters, updateCharacter } from '../../firebase/firebase';
import { useAtom } from 'jotai'
import { tempCharacterAtom } from '../../pages/create'
import { SummaryCard } from './components/SummaryCard';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { FromStats } from './tabs/FromStats';
import { FromClass } from './tabs/FromClass';
import { FromRace } from './tabs/FromRace';
import { FromBG } from './tabs/FromBG';
import { ProfDisplay } from './tabs/ProfDisplay';

const regexCheck = (prof) => {
    const regex = /skill-[a-zA-Z]+/i;
    // console.log(regex.test(`${prof.index}`))
    return regex.test(`${prof.index}`);
}

export const CharSheet = ({loadedChar}) => {

    const [tabValue, setTabValue] = useState(0);
    const [ready, setReady] = useState(false);

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
    
    const [skillProfs, setSkillProfs] = useState([]);
    const [equipProfs, setEquipProfs] = useState([]);
    
    const savingProfs = tempCharacter?.fromClass?.selectedClassInfo?.saving_throws;
    const fightingStyle = tempCharacter?.fromClass?.feature;
    const dragonAncestry = tempCharacter?.fromRace?.trait;
    const extraRaceStats = tempCharacter?.fromRace?.ability_bonus;
    
    useEffect(() => {
        
        loadedChar ? setTempCharacter(loadedChar) : null; //!
        // console.log("charsheet useEffect triggered");
        setReady(false);
        const profObject = {
            classDefProfs: tempCharacter?.fromClass?.selectedClassInfo?.proficiencies,
            classChooseProfs: tempCharacter?.fromClass?.proficiencies,
            raceDefProfs: tempCharacter?.fromRace?.selectedRaceInfo?.starting_proficiencies,
            raceChooseProfs: tempCharacter?.fromRace?.proficiencies,
            bgDefProfs: tempCharacter?.fromBackground.selectedBGInfo?.starting_proficiencies,
            bgChooseProfs: tempCharacter?.fromBackground?.proficiencies
        }
        const tempArray = [];
        const tempSkill = [];
        const tempEquip = [];
        for (const thisProf in profObject) {
            // console.log(profObject[thisProf]);
            if (profObject[thisProf]?.length > 0 || profObject[thisProf] !== undefined ) {
                tempArray.push(...profObject[thisProf])
            }
        }
        //! working fine up to here
        // console.log("useeff temparray", tempArray)
        tempArray.map((prof) => {
            if (regexCheck(prof)) {
                tempSkill.push(prof);
            } else {
                tempEquip.push(prof);
            }
        })

        setSkillProfs(tempSkill);
        setEquipProfs(tempEquip);
        setReady(true);
        
    },[tempCharacter])
    
    // console.log(allProficiencies)
    // console.log("skillProfs",skillProfs)
    // console.log("equipProfs",equipProfs)

    //* firebase stuff
    //? firebase stuff
    //! firebase stuff 

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
        // console.log("handleUpdate triggered")
        updateCharacter(tempCharacter)
    }

    return (
        <>  
            {ready
            ?
            <>
            <h1>CharSheet.jsx</h1>
            {loadedChar
            ?
            <Button color="secondary" variant="outlined" onClick={handleUpdate}>Confirm Edit</Button>
            :
            <Button color="secondary" variant="outlined" onClick={handleSave}>Save Character</Button>
            }
            {/* <Button variant="contained" onClick={handleUpdate}>test update</Button> */}
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
                    <ProfDisplay skillProfs={skillProfs} equipProfs={equipProfs} savingProfs={savingProfs} fightingStyle={fightingStyle} dragonAncestry={dragonAncestry} extraRaceStats={extraRaceStats}/>
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
            :
            <LinearProgress />
            }
        </>
    )
}
