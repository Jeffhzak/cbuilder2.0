import React from 'react'
import { CreateChoiceSelection } from '../../utility/CreateChoiceSelection'
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'
import { CreateStatChoice } from "../../utility/CreateStatChoice"
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';

const colStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"
}
const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
  }


export const RaceOptions = ({selectedRaceInfo, choices, setChoices}) => {

    const starting_prof_array = selectedRaceInfo?.starting_proficiencies;
    const starting_proficiency_options = selectedRaceInfo?.starting_proficiency_options;

    const gearProfs = starting_prof_array?.length != 0 ? <CreateDefaultBtns inputArray={starting_prof_array}/>
    : undefined;

    const profOptions = !!starting_proficiency_options ? <CreateChoiceSelection choiceObject={starting_proficiency_options} choices={choices} setChoices={setChoices}/> : undefined;
    

    return (
        <>
            {/* <h1>RaceOptions.jsx</h1> */}
            <Box className="colStyle">
            <Typography variant="h6" mt="1em">Proficiencies gained: </Typography>
            <Divider/>
            {!!gearProfs ? gearProfs : "None"}  
            <Typography variant="h6" mt="1em">Proficiency Options: </Typography>
            <Divider/>
            <Box sx={rowStyle}>
                {!!profOptions ? profOptions : "None"}    
            </Box>
        </Box>
        </>
    )
}
