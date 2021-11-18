import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import {raceTable} from "../../references/raceTable";
import Image from 'next/image';
import React from 'react';

export const RaceCardMaker = ({index, setStateFunction}) => {
    
    const setRace = (value) => {
        setStateFunction(value);
    }

    return (
        <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>
            <CardActionArea onClick={() => setRace(index)}>
                <CardMedia>
                    <Image 
                    // src={classTable[index].iconSrc} 
                    src={"/test.png"}
                    height="400px" 
                    width="400px"
                    alt={`${index}`}/>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">{raceTable[index].name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{raceTable[index].desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
