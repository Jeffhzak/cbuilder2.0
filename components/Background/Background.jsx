import React from 'react'
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { BGCardMaker } from './components/BGCardMaker';
import { BackgroundInfo } from './BackgroundInfo';


export const Background = ({allBackgroundInfo, successToast, setTab}) => {

    const [playerBG, setPlayerBG] = useState("");
    
    const renderBackgroundChoice = (allBackgroundInfo) => {

        const bgIndexArray = Object.keys(allBackgroundInfo);
        const backgroundCardRender = bgIndexArray.map((bgIndex) => {
            const thisBGInfo = allBackgroundInfo[bgIndex];
            const thisBGIndex = thisBGInfo.index;

            return (
                <BGCardMaker key={thisBGIndex+uuidv4()} index={thisBGIndex} setStateFunction={setPlayerBG} />
            )
        })

        return backgroundCardRender;
    }
    return (
        <>
            <h1>Background.jsx</h1>
            <h1>{playerBG}</h1>
            {playerBG.length === 0
            ?
            <>
            <Typography variant="h4">Select your Background:</Typography>
            <Box sx={{display: "flex", flexWrap:"wrap"}}>
            {renderBackgroundChoice(allBackgroundInfo)}
            </Box>
            </>
            :
            <BackgroundInfo playerBG={playerBG} setPlayerBG={setPlayerBG} selectedBGInfo={allBackgroundInfo[playerBG]} successToast={successToast} setTab={setTab}/> 
            }
        </>
    )
}
