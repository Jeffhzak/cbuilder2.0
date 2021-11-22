import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useContext, useState } from 'react'
import Image from 'next/image';
import { StandardArray } from './tabs/StandardArray';
import { PointBuy } from './tabs/PointBuy';

export const Stats = ({allStatsInfo, successToast}) => {
    
    const [PBorSA, setPBorSA] = useState("");
    const [statsObjPB, setStatsObjPB] = useState({
        str: 8,
        dex: 8,
        con: 8,
        int: 8,
        wis: 8,
        cha: 8,
    });
    const [statsObjSA, setStatsObjSA] = useState({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    });
    const [standardArray, setStandardArray] = useState([15, 14, 13, 12, 10, 8])
    const [pbScore, setPbScore] = useState(27);
    
    const renderLogic = () => {
        if (PBorSA === "SA") return <StandardArray stats={statsObjSA} setStats={setStatsObjSA} statDescriptions={allStatsInfo} standardArray={standardArray} setStandardArray={setStandardArray} successToast={successToast} setPBorSA={setPBorSA}/>
        if (PBorSA === "PB") return <PointBuy stats={statsObjPB} setStats={setStatsObjPB} statDescriptions={allStatsInfo} pbScore={pbScore} setPbScore={setPbScore} successToast={successToast} setPBorSA={setPBorSA}/>

        }

    return (
        <>
            <h1>Stats.jsx</h1>
            <button onClick={()=>{console.log(allStatsInfo)}}>log statsinfo</button>
            <Box sx={{mt:"2em", mb:"1em", ml:"20vw", mr:"20vw"}}>
            {PBorSA === ""
            ?
            <>
            <Typography>Pick a method to determine your stats:</Typography>
            <Box className="rowStyle">
                <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>
                    <CardActionArea onClick={() => setPBorSA("SA")}>
                        <CardMedia>
                            <Image 
                            src={"/placeholder-image.png"} 
                            height="400px" 
                            width="400px"
                            alt={`standard-array image`}/>
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="subtitle1">Standard Array</Typography>
                            <Typography variant="subtitle1" color="text.secondary">placeholder</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: "15em", margin:"1em", flexShrink:0 }}>
                    <CardActionArea onClick={() => setPBorSA("PB")}>
                        <CardMedia>
                            <Image 
                            src={"/placeholder-image.png"} 
                            height="400px" 
                            width="400px"
                            alt={`point-buy image`}/>
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="subtitle1">Point Buy</Typography>
                            <Typography variant="subtitle1" color="text.secondary">placeholder</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            </>
            :
            null
            }
            {renderLogic()}
            </Box>
        </>
    )
}
