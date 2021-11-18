import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {v4 as uuidv4} from "uuid"

export const ClassFeatures = ({selectedClassInfo}) => {

    const featureData = selectedClassInfo?.features?.map((arrayStep) => {
        const description = arrayStep.desc.map((arrayStep) => {
            return (
                <Typography key={uuidv4()} variant="h7">{arrayStep}</Typography>
            )
        })
        return (
            <>
            <Typography key={uuidv4()} variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {description}
            </>
        )
    })

    return (
        <>
        <Box className="colStyle">
            {/* <Button onClick={()=>{console.log(levelData)}}>levelData</Button> */}
            <Typography variant="h5" mt="1em">Features at Level 1:</Typography>
            <Typography variant="h6" mt="1em">Hit Points (HP)</Typography>
            <Divider/>
            <Typography variant="h7">Hit Dice: 1d{selectedClassInfo?.hit_die}</Typography>
            <Typography variant="h7">Hit Points at 1st Level: {selectedClassInfo?.hit_die} + your Constitution modifier
            </Typography>
            <Typography variant="h7">Hit Points at Higher Levels: 1d{selectedClassInfo?.hit_die} (or {Math.round(selectedClassInfo?.hit_die / 2 + 0.5)}) + your Constitution modifier per {selectedClassInfo?.name} level after 1st
            </Typography>
            {featureData}
        </Box>
        </>
    )
}
