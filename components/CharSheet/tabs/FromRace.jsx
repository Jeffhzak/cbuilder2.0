import React from 'react'
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CreateChoiceSelection } from '../../utility/CreateChoiceSelection'
import { CreateStatChoice } from "../../utility/CreateStatChoice"
import {v4 as uuidv4} from "uuid"

export const FromRace = ({tempCharacter}) => {

    const selectedRaceInfo = tempCharacter?.fromRace?.selectedRaceInfo;

    const featDescriptionArray = selectedRaceInfo?.traits;
    const abilityBonusArray = selectedRaceInfo?.ability_bonuses;
    const speed = selectedRaceInfo?.speed;

    const featuresRender = () => {
        return featDescriptionArray?.map((arrayStep) => {
            const featuresText = arrayStep?.desc?.map((innerStep) => {
                return (
                    <Typography key={`${innerStep}`+uuidv4()} variant="h7">{innerStep}</Typography>
                )
            })
            
            return (
                <React.Fragment key={`${arrayStep?.name}`+uuidv4()} >
                <Typography variant="h6" mt="1em">{arrayStep?.name}</Typography>
                <Divider/>
                {featuresText}
                {/* {featureSpecific} */}
                </React.Fragment>
            )
        })
    }
    const abilityBonusRender = () => {
        return abilityBonusArray?.map((arrayStep) => {

            return (
                <Button key={`${arrayStep.ability_score.url}`+uuidv4()} variant="contained" color="success" sx={{m:"0.5em"}}>{arrayStep.ability_score.name} + {arrayStep.bonus}</Button>
            )
        });
    }

    return (
        <>
            {selectedRaceInfo
            ?
            <Box className="colStyle">
                <Typography variant="h6" mt="1em">
                    Ability Score Bonuses
                </Typography>
                <Box>
                    {abilityBonusRender()}
                </Box>
                {/* {abilityBonusOptionsRender} */}
                <Typography variant="h6" mt="1em">
                    Speed
                </Typography>
                <Divider/>
                <Typography variant="h7">
                    Your Speed is {speed}.
                </Typography>
                {featuresRender()}
            </Box>
            :
            <Typography variant="h6" mt="1em">{`You haven't selected a race!`}</Typography>
            }
            
        </>
    )
}
