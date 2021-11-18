import React from 'react'
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { RaceCardMaker } from './RaceCardMaker';
import { RaceInfo } from './RaceInfo';


export const Race = ({allRaceInfo}) => {

    const [playerRace, setPlayerRace] = useState("");

    const renderClassChoice = (allRaceInfo) => {
        
        const raceIndexArray = Object.keys(allRaceInfo);
        const raceCardRender = raceIndexArray.map((raceIndex) => {
            const thisRaceInfo = allRaceInfo[raceIndex];
            const thisRaceIndex = thisRaceInfo.index;
            // console.log(thisClassInfo);

            return (
                <RaceCardMaker key={thisRaceIndex+uuidv4()} index={thisRaceIndex} setStateFunction={setPlayerRace} />
            )
        })

        return raceCardRender;
    }
    return (
        <>
            <h1>Race.jsx</h1>
            <h1>{playerRace}</h1>

            {playerRace.length === 0
            ?
            <>
            <Typography variant="h4">Select your Race:</Typography>
            <Box sx={{display: "flex", flexWrap:"wrap"}}>
            {renderClassChoice(allRaceInfo)}
            </Box>
            </>
            :
            <RaceInfo playerRace={playerRace} setPlayerRace={setPlayerRace} selectedRaceInfo={allRaceInfo[playerRace]}/>
            }
        </>
    )
}
