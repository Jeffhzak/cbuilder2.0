import React from 'react'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'
import { CreatePSelection } from '../../utility/CreatePSelection'
import { CreateChoiceSelection } from '../../utility/CreateChoiceSelection'

export const BGOptions = ({selectedBGInfo, choices, setChoices}) => {
    
    const starting_proficiency_options = selectedBGInfo.starting_proficiency_options;

    const defaultProfs = selectedBGInfo?.starting_proficiencies
    ?
    <>
    <CreateDefaultBtns inputArray={selectedBGInfo?.starting_proficiencies}/>
    </>
    :
    null;
    
    const profOptions = !!starting_proficiency_options ? 
    <>
    <CreateChoiceSelection choiceObject={starting_proficiency_options} choices={choices} setChoices={setChoices}/> 
    </>
    : null;
    
    return (
        <>
        <h1>BGOptions.jsx</h1>
        <Typography variant="h6" mt="1em"> Proficiencies gained:</Typography>
        <Divider/>
        {defaultProfs ? defaultProfs : "none"}
        <Typography variant="h6" mt="1em"> Proficiency Options:</Typography>
        <Divider/>
        {profOptions ? profOptions : "none"}
        <Typography variant="h6" mt="1em">Bonds:</Typography>
        <Divider/>
        <Box>
            <CreatePSelection choiceObject={selectedBGInfo.bonds} choices={choices} setChoices={setChoices}/>
        </Box>
        <Typography variant="h6" mt="1em">Flaws:</Typography>
        <Divider/>
        <Box>
            <CreatePSelection choiceObject={selectedBGInfo.flaws} choices={choices} setChoices={setChoices}/>
        </Box>
        <Typography variant="h6" mt="1em">Ideals:</Typography>
        <Divider/>
        <Box>
            <CreatePSelection choiceObject={selectedBGInfo.ideals} choices={choices} setChoices={setChoices}/>
        </Box>
        <Typography variant="h6" mt="1em">Personality Traits:</Typography>
        <Divider/>
        <Box>
            <CreatePSelection choiceObject={selectedBGInfo.personality_traits} choices={choices} setChoices={setChoices}/>
        </Box>
        </>
    )
}
