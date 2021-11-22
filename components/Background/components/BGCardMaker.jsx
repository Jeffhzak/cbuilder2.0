import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import {bgTable} from "../../../references/bgTable";
import Image from 'next/image';
import React from 'react';

export const BGCardMaker = ({index, setStateFunction}) => {
    const setBG = (value) => {
        setStateFunction(value);
    }

    return (
        <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>
            <CardActionArea onClick={() => setBG(index)}>
                <CardMedia>
                    <Image 
                    // src={classTable[index].iconSrc} 
                    src={"/placeholder-image.png"}
                    height="400px" 
                    width="400px"
                    alt={`${index}`}/>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">{bgTable[index].name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
