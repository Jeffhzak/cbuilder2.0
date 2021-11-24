import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { FancyStatDisplay } from '../components/FancyStatDisplay';

export const FromStats = ({tempCharacter, conMod, setConMod}) => {

    const charStats = tempCharacter.baseStats;

    const raceStatBonus = !!tempCharacter?.fromRace?.selectedRaceInfo?.ability_bonuses 
    ? tempCharacter?.fromRace?.selectedRaceInfo?.ability_bonuses
    : undefined;
    
    const extraStatBonus = !!tempCharacter?.fromRace
    ?.ability_bonus ? tempCharacter?.fromRace
    ?.ability_bonus 
    : undefined;

    const L1HP = !!tempCharacter?.fromClass
    ?.selectedClassInfo.hit_die ? tempCharacter?.fromClass
    ?.selectedClassInfo.hit_die : undefined;

    return (
        <>
            <h1>FromStats.jsx</h1>
            <Box sx={{display:"flex", justifyContent:"flex-end", alignItems:"center", maxWidth:"40em"}}>
                <Button sx={{m:"1em", flexGrow:0, mr:"auto"}} variant="outlined">Stats gained from Racial Bonuses</Button>
                <div style={{display:"flex", border:"1px solid white", padding:"0.5em"}}>
                <Typography variant="h5">
                    {`HP at level 1:`}
                </Typography>
                <Typography variant="h5" sx={{ml:"1em"}}>
                 {`${L1HP} + ${conMod}`}
                </Typography>
                </div>
            </Box>
            <Box sx={{display:"flex"}}>
                <FancyStatDisplay 
                charStats={charStats} 
                raceStatBonus={raceStatBonus} 
                extraStatBonus={extraStatBonus}
                setConMod={setConMod} />
            </Box>
            
        </>
    )
}
