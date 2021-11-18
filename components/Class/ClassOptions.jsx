import { Divider, Typography } from '@mui/material'
import { CreateDefaultBtns } from '../utility/CreateDefaultBtns'
import { CreateChoiceSelection } from '../utility/CreateChoiceSelection'
import React from 'react'
import { Box } from '@mui/system'

export const ClassOptions = ({ selectedClassInfo , choices , setChoices }) => {
    return (
        <>
        <Typography variant="h6" mt="1em"> Gear Proficiencies</Typography>
        <Divider/>
        <CreateDefaultBtns inputArray={selectedClassInfo?.proficiencies}/>
        <Typography variant="h6" mt="1em">Proficiency Choices:</Typography>
        <Divider/>
        <Box className="rowStyle">
        {selectedClassInfo?.proficiency_choices?.map((arrayStep, index) => {
            return (
            <CreateChoiceSelection key={`${index}+ygbgh`} choiceObject={arrayStep} choices={choices} setChoices={setChoices}/>
            )
        })}
        </Box>
        </>
    )
}
