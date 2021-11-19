import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import SelectToggleButton from "./SelectToggleButton"


const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
  }


export const CreateStatChoice = ({choiceObject, choices, setChoices}) => {
    // console.log("choiceObject",choiceObject)
    // console.log("choices",choices)

    const choiceLimit = choiceObject?.choose;
    const choiceType = "ability_bonus";
    const arrayOfOptions = choiceObject?.from;

    const [selectedCount, setSelectedCount] = useState(!!choices?.[choiceType]?.length ? choices?.[choiceType]?.length : 0);


    return (
        <Box>
            {!!choiceObject ? <Typography variant="h7" sx={{m:"1em"}}>(Pick {choiceLimit})</Typography> : undefined}
            <Box sx={rowStyle}>
            {arrayOfOptions?.map((arrayStep, index) => {
                const data = {
                    name: `${arrayStep?.ability_score?.name} + ${arrayStep?.bonus}`,
                    info: arrayStep, 
                }
                // console.log(data);
                return (
                <SelectToggleButton key={`${arrayStep?.ability_score.name}+wsxer+${index}`} data={data} selectedCount={selectedCount} setSelectedCount={setSelectedCount} limitCap={choiceLimit} type={choiceType} choices={choices} setChoices={setChoices}/>
                )
            })}
            </Box>
        </Box>
    )
}
