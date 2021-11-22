import React from 'react'
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CreateChoiceSelection } from '../../utility/CreateChoiceSelection'
import { CreateStatChoice } from "../../utility/CreateStatChoice"
import {v4 as uuidv4} from "uuid"

export const RaceFeatures = ({selectedRaceInfo, choices, setChoices}) => {

    const featDescriptionArray = selectedRaceInfo?.traits;
    const abilityBonusArray = selectedRaceInfo?.ability_bonuses;
    const abilityBonusOptions = selectedRaceInfo?.ability_bonus_options;
    const speed = selectedRaceInfo.speed;

    const featuresRender = featDescriptionArray?.map((arrayStep) => {
        const featuresText = arrayStep?.desc?.map((innerStep) => {
            return (
                <Typography key={`${innerStep}`+uuidv4()} variant="h7">{innerStep}</Typography>
            )
        })
        const currentTraitSelectableOptions = arrayStep?.trait_specific?.subtrait_options
        const featureSpecific = <CreateChoiceSelection choiceObject={currentTraitSelectableOptions} choices={choices} setChoices={setChoices}/>
        return (
            <React.Fragment key={`${arrayStep?.name}`+uuidv4()} >
            <Typography variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {featuresText}
            {featureSpecific}
            </React.Fragment>
        )
    })
    const abilityBonusRender = abilityBonusArray?.map((arrayStep) => {

        return (
            <Button key={`${arrayStep.ability_score.url}`+uuidv4()} variant="contained" color="success" sx={{m:"0.5em"}}>{arrayStep.ability_score.name} + {arrayStep.bonus}</Button>
        )
    });

    const abilityBonusOptionsRender = !!abilityBonusOptions ? <>
    <Typography variant="h6" mt="1em">
        Ability Score bonus options
    </Typography>
    <Typography variant="subtitle2">This race gets an option to choose which stat to increase.</Typography>
    <Divider/>
    <CreateStatChoice choiceObject={abilityBonusOptions} choices={choices} setChoices={setChoices}/>
    </>
    : undefined;

    return (
        <>
            <h1>RaceFeatures.jsx</h1>
            <Box className="colStyle">
                <Typography variant="h6" mt="1em">
                    Ability Score Bonuses
                </Typography>
                <Box>
                    {abilityBonusRender}
                </Box>
                {abilityBonusOptionsRender}
                <Typography variant="h6" mt="1em">
                    Speed
                </Typography>
                <Divider/>
                <Typography variant="h7">
                    Your Speed is {speed}.
                </Typography>
                {featuresRender}
            </Box>
        </>
    )
}
