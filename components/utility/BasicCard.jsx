import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import Link from "next/dist/client/link";

export const BasicCard = ({text, imageSrc, linkHref}) => {

    return (
        <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>   <Link href={linkHref}>     
            <CardActionArea>
                <CardMedia>
                    <Image 
                    src={imageSrc} 
                    height="400px" 
                    width="400px"
                    alt={`${text} image`}/>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">{text}</Typography>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    )
}
