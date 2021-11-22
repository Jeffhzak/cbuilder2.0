import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4} from "uuid"
import { PSelectToggle } from './PSelectToggle'


export const CreatePSelection = ({choiceObject, choices, setChoices}) => {
    // console.log("choiceObject",choiceObject)
    // console.log("choices",choices)

    const choiceLimit = choiceObject?.choose;
    const choiceType = choiceObject?.type;
    const arrayOfOptions = choiceObject?.from;

    const [selectedCount, setSelectedCount] = useState(!!choices?.[choiceType]?.length ? choices?.[choiceType]?.length : 0);


    return (
        <Box sx={{mt:"1em", mb:"1em"}}>
            {!!choiceObject ? <Typography variant="h7" sx={{m:"1em"}}>(Pick {choiceLimit})</Typography> : undefined}
            <Box className="colStyle">
            {arrayOfOptions?.map((arrayStep) => {
                return (
                    <PSelectToggle key={uuidv4()} data={arrayStep} selectedCount={selectedCount} setSelectedCount={setSelectedCount} limitCap={choiceLimit} type={choiceType} choices={choices} setChoices={setChoices}/>
                )
            })}
            </Box>
        </Box>
    )
}
