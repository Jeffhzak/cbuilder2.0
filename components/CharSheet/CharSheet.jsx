import { Button, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useAuth } from "../../components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { saveCharacter, findMyCharacters, updateCharacter, deleteCharacter } from '../../firebase/firebase';
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
import { SheetSubmitBox } from './components/SheetSubmitBox';
import { useRouter } from "next/dist/client/router";

const regexCheck = (prof) => {
    const regex = /skill-[a-zA-Z]+/i;
    // console.log(regex.test(`${prof.index}`))
    return regex.test(`${prof.index}`);
}

export const CharSheet = ({loadedChar, removeCharFromUser}) => {
    
    const router = useRouter();

    const [tabValue, setTabValue] = useState(0);
    const [ready, setReady] = useState(false);
    const [submitOpen, setSubmitOpen] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [submitFunc, setSubmitFunc] = useState(null);

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

    useEffect(() => {
        console.log("charsheet useEffect triggered");
        !!loadedChar ? setTempCharacter(loadedChar) : null; //!
        setReady(true);
        return () => {
            loadedChar 
            ? 
            setTempCharacter({
                fromClass: {},
                fromRace: {},
                fromBackground: {},
                baseStats: {},
                name: "Placeholder",
            })
            : null;
        }
    },[])
    
    //! create proficiency arrays on load
    useEffect(() => {
        if (ready) {
            console.log("ready useEffect triggered");
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
        }
    },[ready])

    
    // console.log(allProficiencies)
    // console.log("skillProfs",skillProfs)
    // console.log("equipProfs",equipProfs)

    //* firebase stuff
    //? firebase stuff
    //! firebase stuff 

    const { currentUser, userData, setUserData } = useAuth();

    const handleConfirm = (text, func) => () => {
        console.log("handleConfirm fired")
        setSubmitText(text);
        setSubmitFunc(func);
        setSubmitOpen(true);
    }

    const handleSave = async () => {
        console.log("handleSave fired");
        await toast.promise(
            saveCharacter(tempCharacter, currentUser),
            {
                pending: "Saving your character...",
                success: "Character saved!",
            }, {
                position: "top-center",
                autoClose: 500,
            }) 
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
        
        setSubmitOpen(false);
        setTimeout (() => {
            router.push("/mychars");
        }, 500);
    }

    const handleUpdate = async () => {
        console.log("handleUpdate fired");
        await toast.promise(
            updateCharacter(tempCharacter),
            {
                pending: "Updating your character...",
                success: "Character Updated!",
            }, {
                position: "top-center",
                autoClose: 500,
            }) 
        setSubmitOpen(false);
    }

    const handleDelete = async () => {
        console.log("handleDelete fired");
        const uid = loadedChar.uid;
        await toast.promise(
            deleteCharacter(uid),
            {
                pending: "Deleting your character...",
                success: "Character Deleted. :(",
            }, {
                position: "top-center",
                autoClose: 500,
            }) 

        setSubmitOpen(false);
        removeCharFromUser(uid);
        setTimeout (() => {
            router.push("/mychars");
        }, 500);

    }


    return (
        <>
        <Box sx={{ml: loadedChar ? "5vw" : "0", mr: "5vw"}}>
            
            <h1>CharSheet.jsx</h1>
            <Box sx={{width:"43em", display:"flex", flexDirection:"row-reverse", gap:"1em", mb:"2em"}}>
            {loadedChar
            ?
            <>
                <Button color="error" variant="outlined" onClick={handleConfirm("Are you sure you want to delete this character?", () => handleDelete)}>Delete Character</Button>
                <Button color="secondary" variant="outlined" onClick={handleConfirm("Are you sure you want to confirm these updates?", () => handleUpdate)}>Confirm Edit</Button>
            </>
            :
            <Button color="secondary" variant="outlined" onClick={handleConfirm("Are you sure you want to save this character?", () => handleSave)}>Save Character</Button>
            }
            </Box>
            
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
                    <ProfDisplay skillProfs={skillProfs} equipProfs={equipProfs} savingProfs={savingProfs} fightingStyle={fightingStyle} dragonAncestry={dragonAncestry}/>
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

            <SheetSubmitBox open={submitOpen} setOpen={setSubmitOpen} text={submitText} func={submitFunc} />
        </Box>

        <ToastContainer theme="dark"/>
        </>
    )
}
