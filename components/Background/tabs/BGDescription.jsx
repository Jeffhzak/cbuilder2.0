import React from 'react'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {v4 as uuidv4} from "uuid"

export const BGDescription = ({selectedBGInfo}) => {

    const BGIndex = selectedBGInfo.index;


    const featureData = selectedBGInfo?.features?.map((arrayStep) => {
        const description = arrayStep.desc.map((textblock) => {
            return (
                <Typography key={uuidv4()} variant="h7">{textblock}</Typography>
            )
        })
        return (
            <React.Fragment key={uuidv4()} >
            <Typography variant="h6" mt="1em">{arrayStep?.name}</Typography>
            {description}
            </React.Fragment>
        )
    })
    return (
        <>
            {/* <h1>BGDescription.jsx</h1> */}
            <Box className="colStyle">
                <Typography variant="h6" mt="1em">Description:</Typography>
                <Divider/>
                <Typography variant="h7">
                    {selectedBGInfo.desc}
                </Typography>
                <Typography variant="h6" mt="1em">Features:</Typography>
                <Divider/>
                {featureData}
            </Box>
        </>
    )
}
