import { Divider, Typography } from '@mui/material'
import React from 'react'
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'

export const ProfDisplay = ({skillProfs, equipProfs, savingProfs, fightingStyle, dragonAncestry, extraRaceStats}) => {

    const renderProfs = (array, text) => {
        return (
            <>
            <Typography variant="h6" mt="1em">{text}</Typography>
            <Divider/>
            <CreateDefaultBtns inputArray={array} />
            </>
        )
    }
    return (
        <>  
            {savingProfs ? renderProfs(savingProfs, "Saving Throw Proficiencies:") : null}
            {extraRaceStats ? renderProfs(extraRaceStats, "Selected Stats from Race:") : null}
            {fightingStyle ? renderProfs(fightingStyle, "Selected Fighting Style:") : null}
            {dragonAncestry ? renderProfs(dragonAncestry, "Selected Draconic Ancestry: "): null}
            {skillProfs ? renderProfs(skillProfs, "Skill Proficiencies:") : null}
            {equipProfs ? renderProfs(equipProfs, "Equipment Proficiencies: ") : null}
        </>
    )
}
