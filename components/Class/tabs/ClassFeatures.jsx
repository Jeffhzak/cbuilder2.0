import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {v4 as uuidv4} from "uuid"
import { CreateChoiceSelection } from '../../utility/CreateChoiceSelection'
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'

export const ClassFeatures = ({selectedClassInfo, choices, setChoices}) => {

    
    const featureData = selectedClassInfo?.features?.map((arrayStep) => {
        const featureSpecificSelector = arrayStep?.feature_specific?.subfeature_options;
        const description = arrayStep.desc.map((arrayStep) => {
            return (
                <Typography key={uuidv4()} variant="h7">{arrayStep}</Typography>
            )
        })
        return (
            <React.Fragment key={uuidv4()}>
            <Typography variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider />
            {description}
            {!!featureSpecificSelector
            ?
            <CreateChoiceSelection choiceObject={featureSpecificSelector} choices={choices} setChoices={setChoices} />
            :
            null
            }
            </React.Fragment>
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
            <Typography variant="h6" mt="1em">Saving Throws:</Typography>
            <Divider/>
            <Typography variant="h7">You are proficient in the following saving throws:</Typography>
            <CreateDefaultBtns inputArray={selectedClassInfo.saving_throws} />
            {featureData}
        </Box>
        </>
    )
}
