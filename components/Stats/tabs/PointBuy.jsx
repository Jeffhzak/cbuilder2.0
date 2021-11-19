import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {v4 as uuidv4} from "uuid"
import PointBuyGrid from '../components/PointBuyGrid'

export const PointBuy = ({stats, setStats, statDescriptions, pbScore, setPbScore}) => {

    const renderStatGrid = () => {
        const statGrid = []; 
        for (const objectStep in stats) {
            //! renders grid of stats
            statGrid.push(<PointBuyGrid key={uuidv4()} statName={objectStep} statDescriptions={statDescriptions} stats={stats} setStats={setStats} pbScore={pbScore} setPbScore={setPbScore}/>);
        }

        return (
            <>
                {statGrid}
            </>
        )
    }
    return (
        <>
            <Button onClick={()=>console.log(stats)}>log stats</Button>
            <h3>pointbuy.jsx</h3>
            <Typography variant="h5">Points remaining: {pbScore}</Typography>

            {renderStatGrid()}

            <Button variant="contained" sx={{mt: "2em"}}>Submit</Button>
        </>
    )
}
