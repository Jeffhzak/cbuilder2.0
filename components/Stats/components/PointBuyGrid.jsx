import React from 'react'
import { useEffect, useState } from 'react';
import {  Button, Grid, Typography } from '@mui/material'
// import StatDesc from './StatDesc';
import { Box } from '@mui/system';
import StatDesc from './StatDesc';


export default function PointBuyGrid({statName, statDescriptions, stats, setStats, pbScore, setPbScore}) {


    const [currentCost, setCurrentCost] = useState(1);
    
    useEffect(() => {
        setCurrentCost(stats[statName] < 13 ? 1 : 2);
    }, [stats[statName]])
    

    const pointBuyLogic = (plusOrMinus) => {
        let newValue = 0;

        
        switch (plusOrMinus) {
            case "+":
                setPbScore(x => x - currentCost);
                newValue = stats[statName]+1;
                setStats(x => x={...stats, [statName]:newValue})
                break;
            case "-":
                setPbScore(x => x + ( stats[statName] === 13? 1 : currentCost));
                newValue = stats[statName]-1;
             setStats(x => x={...stats, [statName]:newValue})
                break;
        
            default:
                console.log("pblogic error")
                break;
        }
    }

    const handlePlus = () => {
        if(stats[statName] <15 && pbScore >= currentCost) {
            pointBuyLogic("+")
        }
    }

    const handleMinus = () => {
        if(stats[statName] > 8) {
            pointBuyLogic("-")
        }
    }
    return (
        <Grid container spacing={1} alignItems="center" key={`${statName+"wewewe"}`} mt="1em">
            <Grid item xs={4} s={4} md={1} lg={1}>
                <StatDesc stat={statName} statDesc={statDescriptions}/>
            </Grid>
            <Grid item xs={4} s={4} md={2} lg={1}>
                <Typography variant="h5" >{statDescriptions[statName]?.name} </Typography>
            </Grid>
            <Grid item xs={4} s={4} md={1} lg={1}>
                <Typography variant="h5" >: </Typography>
            </Grid>
            <Grid item xs={12} s={9} md={5} lg={4}>
                <Box display="flex" flexDirection="row">
                    <Button variant="contained" onClick={handleMinus}>-</Button>
                    <Typography variant="h5" margin="0 1em 0 1em">{stats[statName]}</Typography>
                    <Button variant="contained" onClick={handlePlus}>+</Button>
                </Box>
            </Grid>
            <Grid item xs={12} s={3} md={2} lg={2}>
                <Typography variant="h6" margin="0 1em 0 1em">Cost:{currentCost}</Typography>
            </Grid>
        </Grid>
    )
}
