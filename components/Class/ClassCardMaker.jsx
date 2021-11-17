import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import {classTable} from "../../references/classTable"
import React from 'react'

export const ClassCardMaker = ({index, setStateFunction}) => {

    return (
        <Card sx={{ maxWidth: "15em" }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt={`${classTable[index].name}`}>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">{classTable[index].name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{classTable[index].desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
