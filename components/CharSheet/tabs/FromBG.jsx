import React from 'react'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {v4 as uuidv4} from "uuid"
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'


export const FromBG = ({tempCharacter}) => {

    const selectedBGInfo = tempCharacter?.fromBackground?.selectedBGInfo;
    const starting_proficiencies = selectedBGInfo?.starting_proficiencies;
    const bonds = tempCharacter?.fromBackground?.bonds;
    const flaws = tempCharacter?.fromBackground?.flaws;
    const ideals = tempCharacter?.fromBackground?.ideals;
    const personality = tempCharacter?.fromBackground?.personality_traits;

    const defaultProfs = starting_proficiencies
    ?
    <>
    <CreateDefaultBtns inputArray={selectedBGInfo?.starting_proficiencies}/>
    </>
    :
    null;

    const featureData = () => {
        return selectedBGInfo?.features?.map((arrayStep) => {
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
    }
    
    const bondsRender = () => {
        const bondsData = bonds.map((bondDesc) => {
            return (
                <React.Fragment key={uuidv4()}>
                <Typography variant="h7">
                    {bondDesc}
                </Typography>
                </React.Fragment>
            )
        })
        return (
            <>
            <Typography variant="h6" mt="1em">Bonds:</Typography>
            <Divider/>
            {bondsData}
            </>
        )
    }

    const flawsRender = () => {
        const flawsData = flaws.map((flawDesc) => {
            return (
                <React.Fragment key={uuidv4()}>
                <Typography variant="h7">
                    {flawDesc}
                </Typography>
                </React.Fragment>
            )
        })
        return (
            <>
            <Typography variant="h6" mt="1em">Flaws:</Typography>
            <Divider/>
            {flawsData}
            </>
        )
    }

    const idealsRender = () => {
        const idealsData = ideals.map((idealDesc) => {
            return (
                <React.Fragment key={uuidv4()}>
                <Typography variant="h7">
                    {idealDesc}
                </Typography>
                </React.Fragment>
            )
        })
        return (
            <>
            <Typography variant="h6" mt="1em">Ideals:</Typography>
            <Divider/>
            {idealsData}
            </>
        )
    }

    const personalityRender = () => {
        const personalityData = personality.map((personalityDesc) => {
            return (
                <React.Fragment key={uuidv4()}>
                <Typography variant="h7">
                    {personalityDesc}
                </Typography>
                </React.Fragment>
            )
        })
        return (
            <>
            <Typography variant="h6" mt="1em">Personality Traits:</Typography>
            <Divider/>
            {personalityData}
            </>
        )
    }

    return (
        <>
            {selectedBGInfo
            ?
            <Box className="colStyle">
                <Typography variant="h6" mt="1em">Proficiencies gained:</Typography>
                <Divider/>
                {defaultProfs}
                <Typography variant="h6" mt="1em">Description:</Typography>
                <Divider/>
                <Typography variant="h7">
                    {selectedBGInfo.desc}
                </Typography>
                <Typography variant="h6" mt="1em">Features:</Typography>
                <Divider/>
                {featureData()}
                {bondsRender()}
                {flawsRender()}
                {idealsRender()}
                {personalityRender()}
            </Box>
            :
            <Typography variant="h6" mt="1em">{`You haven't selected a background!`}</Typography>
            }
        </>
    )
}
