import React from 'react'
import { useAuth } from '../../components/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import Image from 'next/image';
import { Button, Card, CardContent, CardMedia, CardActionArea, TextField, Typography } from '@mui/material';
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";

const Mychars = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const router = useRouter();


    const renderCharacters = () => {
        return userData.characters.map((characterData) => {

            const charName = characterData?.name;
            const charRace = characterData?.fromRace?.selectedRaceInfo?.name ?? "<Race>";
            const charClass = characterData?.fromClass?.selectedClassInfo?.class?.name ?? "<Class>";
            const portraitURL = characterData?.image_url;
            const uid = characterData.uid;

            return (
                <Card key={uuidv4()} sx={{ width:"25em", m:"1em", ml:"5em" }}>
                    <Link href={`/mychars/${uid}`}>
                    <CardActionArea sx={{ display: 'flex', justifyContent:"left" }}>
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
                        <Typography component="div" variant="h5">
                            {charName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {`${charRace} ${charClass}`}
                        </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        
                        </Box>
                    </Box>
                    </CardActionArea>
                    </Link>
                </Card>
            )
        })
    }
    
    return (
        <div>
            <h1>Mychars.jsx</h1>
            <Box sx={{width:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            {userData?.characters?.length > 0
            ?
            renderCharacters()
            :
            <h1>You dont have any characters! Create one?</h1>
            }
            </Box>
        </div>
    )
}

export default Mychars;