import { Card, CardActionArea, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { ClassCardMaker } from './ClassCardMaker';

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
            <Box >
                {renderClassChoice(allClassInfo)}
            </Box>
        </>
    )
}
