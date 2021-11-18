import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { ClassCardMaker } from './ClassCardMaker';
import { ClassInfo } from './ClassInfo';

export const Class = ({allClassInfo}) => {

    // console.log("class.jsx", allClassInfo);
    const [playerClass, setPlayerClass] = useState("");

    const renderClassChoice = (allClassInfo) => {
        
        const classIndexArray = Object.keys(allClassInfo);
        const classCardRender = classIndexArray.map((classIndex) => {
            const thisClassInfo = allClassInfo[classIndex];
            const thisClassIndex = thisClassInfo.class.index;
            // console.log(thisClassInfo);

            return (
                <ClassCardMaker key={thisClassIndex+uuidv4()} index={thisClassIndex} setStateFunction={setPlayerClass} />
            )
        })

        return classCardRender;
    }
    return (

        <>
            <h1>Class.jsx</h1>
            <button onClick={()=>{console.log(playerClass)}}>log class</button>
            {playerClass?.length === 0 
            ?
            <>
            <Typography variant="h4">Select your Class:</Typography>
            <Box sx={{display: "flex", flexWrap:"wrap"}}>
                {renderClassChoice(allClassInfo)}
            </Box>
            </>
            :
            <ClassInfo playerClass={playerClass} setPlayerClass={setPlayerClass} selectedClassInfo={allClassInfo[playerClass]}/>
             }
        </>
    )
}
