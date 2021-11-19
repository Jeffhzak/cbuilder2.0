import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const RaceDescription = ({selectedRaceInfo}) => {
    return (
        <>
        <h1>RaceDescription.jsx</h1>
        <Box className="colStyle">
            <Typography variant="h6" mt="1em">Size: {selectedRaceInfo?.size}</Typography>
            <Divider/>
            <Typography variant="h7">{selectedRaceInfo?.size_description}</Typography>
            <Typography variant="h6" mt="1em">Age</Typography>
            <Divider/>
            <Typography variant="h7">{selectedRaceInfo?.age}</Typography>
            <Typography variant="h6" mt="1em">Alignment</Typography>
            <Divider/>
            <Typography variant="h7">{selectedRaceInfo?.alignment}</Typography>
            <Typography variant="h6" mt="1em">Languages</Typography>
            <Divider/>
            <Typography variant="h7">{selectedRaceInfo?.language_desc}</Typography>
        </Box>
        </>
    )
}
