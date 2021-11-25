import { Button, Card, Divider, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState, useEffect } from "react"
import { CBGSubmitBox } from '../../../components/Custom-Background/CBGSubmitBox';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../../components/AuthContext";
import { saveCustomBG, updateCustomBG } from '../../../firebase/firebase';
import axios from "axios";
import { skillsApiGet } from '../../../components/Stats/statsApiGet';
import { CreateChoiceSelection } from '../../../components/utility/CreateChoiceSelection';

const cardStyle = {width:"53em", p:"1em", m:"0.5em", flexShrink:0, flexGrow:0};

const CustomBackground = ({allSkillsInfo, loadedCustomBG}) => {
    console.log(loadedCustomBG)
    const router = useRouter();
    const { currentUser, userData, setUserData } = useAuth();
    const [open, setOpen] = useState(false);

    const [profChoices, setProfChoices] = useState(
        {
            choose: 2,
            from: [...allSkillsInfo],
            type: "starting_proficiencies"
        }
    )
    const [bgFormData, setBGFormData] = useState(
        {
            name: "",
            desc: "",
            features: [
                {
                name: "",
                desc: [""]
                }
            ],
            bonds: {
                choose: 1,
                type: "bonds",
                from: [""],
            },
            flaws: {
                choose: 1,
                type: "flaws",
                from: [""],
            },
            ideals: {
                choose: 1,
                type: "ideals",
                from: [""],
            },
            personality_traits: {
                choose: 2,
                type: "personality_traits",
                from: ["",""],
            },
            starting_proficiencies: [],
        }
    )
    
    useEffect(() => {
        if (!!loadedCustomBG) {
            setBGFormData(loadedCustomBG);
        }
    },[])

    const handleFormChangeBFIP = (index) => (event) => {

        // console.log(event.target)
        const type = event.target.id;
        const newText = event.target.value;
        const refArray = bgFormData[type].from;
        const moddedArray = [...refArray];
        moddedArray[index] = newText;
        // console.log(moddedArray)
        setBGFormData({
            ...bgFormData,
            [type]: {
                ...bgFormData[type],
                from:[...moddedArray],
            }
        })

    }

    const handleFormChangeDN = (event) => {

        const type = event.target.id;
        const newText = event.target.value;
        setBGFormData({
            ...bgFormData,
            [type]: newText,
        })

    }

    const handleFeatNameChange = (featIndex) => (event) => {
        const newText = event.target.value;
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray[featIndex].name = newText;
        
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        })
    }

    const handleFeatDescChange = (featIndex, descIndex) => (event) => {
        const newText = event.target.value;
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray[featIndex].desc[descIndex] = newText;
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        })
    }

    const addFeatDescField = (featIndex) => () => {
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray[featIndex].desc.push("");
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        })
    }

    const removeFeatDescField = (featIndex, descIndex) => () => {
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray[featIndex].desc.splice(descIndex, 1);
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        })


    }

    const addFeat = () => {
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray.push(
            {
            name: "",
            desc: [""]
            }
        );
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        });

    }
    
    const removeFeat = (index) => () => {
        const moddedFeatArray = [...bgFormData.features];
        moddedFeatArray.splice(index, 1);
        setBGFormData({
            ...bgFormData,
            features: [...moddedFeatArray],
        });
    }

    const addFieldBFIP = (event) => {
        const type = event.target.id;
        const refArray = bgFormData[type].from;
        const moddedArray = [...refArray];
        moddedArray.push("");
        setBGFormData({
            ...bgFormData,
            [type]: {
                ...bgFormData[type],
                from:[...moddedArray],
            }
        })
    }

    const removeFieldBFIP = (index) => (event) => {

        const type = event.target.id;
        const newText = event.target.value;
        const refArray = bgFormData[type].from;
        const moddedArray = [...refArray];
        moddedArray.splice(index, 1);
        setBGFormData({
            ...bgFormData,
            [type]: {
                ...bgFormData[type],
                from:[...moddedArray],
            }
        })
    }

    const nameField = () => {
        return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`name-01`}>
            <TextField
                sx={{width:"35em"}}
                id="name"
                variant="filled"
                value={bgFormData.name}
                placeholder="What's your background called?"
                onChange={handleFormChangeDN}
            />
            </Box>

        )

    }

    const descField = () => {
        return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`desc-01`}>
            <TextField
                sx={{width:"35em"}}
                id="desc"
                variant="filled"
                value={bgFormData.desc}
                placeholder="Brief Description"
                onChange={handleFormChangeDN}
            />
            </Box>

        )
    }
    
    const bondsFields = () => {
        
        return bgFormData.bonds.from.map((bondText, index) => {
            return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`bonds-${index}`}>
                <TextField
                    sx={{width:"35em"}}
                    id="bonds"
                    variant="filled"
                    value={bondText}
                    placeholder="1-line bond description"
                    onChange={handleFormChangeBFIP(index)}
                />
                <Button id="bonds" onClick={addFieldBFIP}>Add Option</Button>
                {index === 0
                ?
                null
                :
                <Button id="bonds" onClick={removeFieldBFIP(index)} color="error">Remove</Button>
                }
            </Box>
            )

        })

    }

    const flawsFields = () => {
        
        return bgFormData.flaws.from.map((flawText, index) => {
            return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`flaws-${index}`}>
                <TextField
                    sx={{width:"35em"}}
                    id="flaws"
                    variant="filled"
                    value={flawText}
                    placeholder="1-line flaw description"
                    onChange={handleFormChangeBFIP(index)}
                />
                <Button id="flaws" onClick={addFieldBFIP}>Add Option</Button>
                {index === 0
                ?
                null
                :
                <Button id="flaws" onClick={removeFieldBFIP(index)} color="error">Remove</Button>
                }
            </Box>
            )

        })

    }

    const idealsFields = () => {
        
        return bgFormData.ideals.from.map((idealText, index) => {
            return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`ideals-${index}`}>
                <TextField
                    sx={{width:"35em"}}
                    id="ideals"
                    variant="filled"
                    value={idealText}
                    placeholder="1-line ideal description"
                    onChange={handleFormChangeBFIP(index)}
                />
                <Button id="ideals" onClick={addFieldBFIP}>Add Option</Button>
                {index === 0
                ?
                null
                :
                <Button id="ideals" onClick={removeFieldBFIP(index)} color="error">Remove</Button>
                }
            </Box>
            )

        })

    }

    const personality_traitsFields = () => {
        
        return bgFormData.personality_traits.from.map((personalityText, index) => {
            return (
            <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`personality_traits-${index}`}>
                <TextField
                    sx={{width:"35em"}}
                    id="personality_traits"
                    variant="filled"
                    value={personalityText}
                    placeholder="1-line personality trait description"
                    onChange={handleFormChangeBFIP(index)}
                />
                <Button id="personality_traits" onClick={addFieldBFIP}>Add Option</Button>
                {index < 2
                ?
                null
                :
                <Button id="personality_traits" onClick={removeFieldBFIP(index)} color="error">Remove</Button>
                }
            </Box>
            )

        })

    }

    const featuresFields = () => {

        return bgFormData.features.map((featureObj, index) => {

            const descRender = featureObj.desc.map((descText, i) => {
                return (
                    <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`featdesc-${index}-${i}`}>
                        <TextField
                            sx={{width:"35em"}}
                            id="desc"
                            helperText="description"
                            variant="filled"
                            value={descText}
                            placeholder="This represents a paragraph of text."
                            onChange={handleFeatDescChange(index, i)}
                        />
                        <Button id="feat-para" onClick={addFeatDescField(index)}>+Paragraph</Button>
                        {i === 0
                        ?
                        null
                        :
                        <Button id="feat-para" onClick={removeFeatDescField(index, i)} color="error">X</Button>
                        }
                    </Box>
                )
            })

            return (
                <Card sx={cardStyle} key={`features-${index}`}>
                    <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end", justifyContent:"flex-end"}}>
                    <Typography variant="h5" mt="1em">{`Feature #${index+1}`}</Typography>
                    <Typography variant="subtitle2" color="GrayText" mt="1em" mr="auto">{"( Give details about your background feature. )"}</Typography>
                    <Button onClick={addFeat}>Add Feature</Button>
                    {index === 0
                        ?
                        null
                        :
                        <Button onClick={removeFeat(index)} color="error">X</Button>
                    }
                    </Box>
                    <Divider/>
                    <Box sx={{display:"flex", gap:"1em", m:"1em"}} key={`feature-name-${index}`}>
                    <TextField
                        sx={{width:"35em"}}
                        id="name"
                        helperText="name"
                        variant="filled"
                        value={bgFormData.features[index].name}
                        placeholder="What's your Feature called?"
                        onChange={handleFeatNameChange(index)}
                    />
                    </Box>
                    {descRender}
                </Card>
            )
        })
    }

    const openModal = () => {
        setOpen(true);
    }

    const handleSubmit = async () => {

        const customBGExists = !!userData?.custom_backgrounds?.length;
    
        await toast.promise(
            saveCustomBG(bgFormData, currentUser),
            {
                pending: "Saving your custom background...",
                success: "Background saved!",
            }, {
                position: "top-center",
                autoClose: 500,
            });
        
        if (customBGExists) {
            const newArray = [...userData.custom_backgrounds];
            newArray.push(bgFormData);
            setUserData({
                ...userData,
                custom_backgrounds: [...newArray],
            })
        } else {
            setUserData({
                ...userData,
                custom_backgrounds: [{...bgFormData}],
            })
        }

        setOpen(false);
        setTimeout (() => {
            router.push("/custom-options");
        }, 500);

    }

    const handleUpdate = async () => {
        await toast.promise(
            updateCustomBG(bgFormData),
            {
                pending: "Updated your custom background...",
                success: "Background updated!",
            }, {
                position: "top-center",
                autoClose: 500,
            });
        
    }

    return (
        <>
        {/* <h1>CustomBackground.jsx</h1> */}
        <Typography variant="h4" mt="1em">Creating a custom Background:</Typography>
        <Typography variant="subtitle1" mt="1em">A background represents how and where your character was in their backstory.</Typography>
        {loadedCustomBG
        ?
        <Button variant="contained" color="secondary" onClick={handleUpdate}>Update my background</Button>
        :
        <Button variant="contained" color="secondary" onClick={openModal}>Save this background!</Button>
        }
        {/* <Button onClick={()=>console.log(bgFormData)}>Log bgFormData</Button>
        <Button onClick={()=>console.log(allSkillsInfo)}>Log allSkillsInfo</Button> */}
        <Box sx={{display:"flex", flexWrap:"wrap"}}>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Name"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( Name your background! )"}</Typography>
            </Box>
            <Divider/>
            {nameField()}
        </Card>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Description"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( Describe your background! )"}</Typography>
            </Box>
            <Divider/>
            {descField()}
        </Card>
        {featuresFields()}
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Starting Proficiencies"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( Your background offers you proficiencies. )"}</Typography>
            </Box>
            <Divider/>
            <CreateChoiceSelection choiceObject={profChoices} choices={bgFormData} setChoices={setBGFormData}/>
        </Card>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Bonds"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( You'll be choosing from 1 of these )"}</Typography>
            </Box>
            <Divider/>
            {bondsFields()}
        </Card>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Flaws"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( You'll be choosing from 1 of these )"}</Typography>
            </Box>
            <Divider/>
            {flawsFields()}
        </Card>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Ideals"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( You'll be choosing from 1 of these )"}</Typography>
            </Box>
            <Divider/>
            {idealsFields()}
        </Card>
        <Card sx={cardStyle}>
            <Box sx={{display:"flex", gap:"1em", alignItems:"flex-end"}}>
            <Typography variant="h5" mt="1em">{"Personality Traits"}</Typography>
            <Typography variant="subtitle2" color="GrayText" mt="1em">{"( You'll be choosing from 2 of these )"}</Typography>
            </Box>
            <Divider/>
            {personality_traitsFields()}
        </Card>
        <CBGSubmitBox open={open} setOpen={setOpen} handleSubmit={handleSubmit}/>
        </Box>

        <ToastContainer theme="dark"/>
        </>
    )
}

export default CustomBackground;


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