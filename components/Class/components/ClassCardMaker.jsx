import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import {classTable} from "../../../references/classTable.js";
import Image from 'next/image';
import React from 'react';

export const ClassCardMaker = ({index, setStateFunction}) => {
    
    const setClass = (value) => {
        setStateFunction(value);
    }

    return (
        <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>
            <CardActionArea onClick={() => setClass(index)}>
                <CardMedia>
                    <Image 
                    src={classTable[index].iconSrc} 
                    height="400px" 
                    width="400px"
                    alt={`${classTable[index].name}`}/>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">{classTable[index].name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{classTable[index].desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
