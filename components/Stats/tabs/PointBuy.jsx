import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4} from "uuid"
import { StatSubmit } from '../components/StatSubmit'
import PointBuyGrid from '../components/PointBuyGrid'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const PointBuy = ({stats, setStats, statDescriptions, pbScore, setPbScore, successToast, setPBorSA, setTab}) => {


    const [open, setOpen] = useState(false);

    const errorToast = () => {
        toast.error(`You have unspent points!`, {
            position: "top-center",
            autoClose: 4000,
        })
    }

    const handleSubmit = () => {
        if (pbScore > 0) return errorToast();
        if (pbScore === 0) return setOpen(true);
    }

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
            <Button variant="contained" onClick={()=>{setPBorSA("")}}>Go Back</Button>
            {/* <Button onClick={()=>console.log(stats)}>log stats</Button>
            <h3>pointbuy.jsx</h3> */}
            <Typography variant="h5">Points remaining: {pbScore}</Typography>

            {renderStatGrid()}

            <Button variant="contained" sx={{mt: "2em"}} onClick={handleSubmit}>Submit</Button>

            <StatSubmit open={open} setOpen={setOpen} stats={stats} successToast={successToast} setTab={setTab}/>

            <ToastContainer theme="dark"/>
        </>
    )
}
