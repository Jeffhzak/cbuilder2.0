import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const ClassFeatures = () => {
    return (
        <>
        <Box style={colStyle}>
            {/* <Button onClick={()=>{console.log(levelData)}}>levelData</Button> */}
            <Typography variant="h5" mt="1em">Features at Level 1:</Typography>
            <Typography variant="h6" mt="1em">Hit Points (HP)</Typography>
            <Divider/>
            <Typography variant="h7">Hit Dice: 1d{modalData?.hit_die}</Typography>
            <Typography variant="h7">Hit Points at 1st Level: {modalData?.hit_die} + your Constitution modifier
            </Typography>
            <Typography variant="h7">Hit Points at Higher Levels: 1d{modalData?.hit_die} (or {Math.round(modalData?.hit_die / 2 + 0.5)}) + your Constitution modifier per {modalData?.name} level after 1st
            </Typography>
            {/* {featureData} */}
        </Box>
        </>
    )
}
