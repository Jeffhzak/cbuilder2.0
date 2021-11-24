import React from 'react'
import { Box } from '@mui/system';
import Image from 'next/image';
import { Button, Card, CardContent, CardMedia, CardActionArea, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NameFieldEditor } from './NameFieldEditor';

export const SummaryCard = ({characterData, setTempCharacter}) => {

    const charName = characterData?.name;
    const charRace = characterData?.fromRace?.selectedRaceInfo?.name ?? "<Race>";
    const RaceTrait = characterData?.fromRace?.trait?.[0]?.name;
    const charClass = characterData?.fromClass?.selectedClassInfo?.class?.name ?? "<Class>";
    const portraitURL = characterData?.image_url;


    return (
        <Card sx={{ width:"30em", m:"1em", ml:"5em", display: 'flex', justifyContent:"left" }}>
            <CardMedia >
                <Box sx={{width:"150px", height:"150px", position:"relative", backgroundColor:"#07212e"}}>
                    <Image 
                    src={
                        portraitURL?.length > 0
                        ?
                        `/api/imageproxy?url=${encodeURIComponent(portraitURL)}`
                        :
                        "/placeholder-image.png"
                        } 
                    alt="Character Portrait" 
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.png"
                    />
                </Box>
            </CardMedia>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml:"2em" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <NameFieldEditor charName={charName} setTempCharacter={setTempCharacter} />
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{wordWrap:"break-word"}}>
                    {`${charRace} ${charClass}`}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{wordWrap:"break-word"}}>
                    {RaceTrait ? `${RaceTrait}` : null}
                </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}
