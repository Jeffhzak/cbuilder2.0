import React from 'react'
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {v4 as uuidv4} from "uuid"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { SAGrid } from '../components/SAGrid';
import { StatSubmit } from '../components/StatSubmit';

export const StandardArray = ({stats, setStats, statDescriptions, standardArray, setStandardArray, successToast, setPBorSA, setTab}) => {

    const [open, setOpen] = useState(false);
    
    const errorToast = () => {
        toast.error(`You have unselected stats!`, {
            position: "top-center",
            autoClose: 4000,
        })
    }

    const renderGrid = () => {
        const statGrid = [];

            for (const thisStat in stats) {
                statGrid.push(
                    <SAGrid key={uuidv4()} statName={thisStat} statDescriptions={statDescriptions} stats={stats} setStats={setStats} standardArray={standardArray} setStandardArray={setStandardArray} />
                )
            }

        return statGrid;
    }

    const handleSubmit = () => {
        if (standardArray.length > 0) return errorToast();
        if (standardArray.length === 0) return setOpen(true);
    }

    return (
        <>
            <Button variant="contained" onClick={()=>{setPBorSA("")}}>Go Back</Button>
            <Button onClick={()=>console.log(stats)}>log stats</Button>
            <Button onClick={()=>console.log(standardArray)}>log SA</Button>
            <h3>StandardArray.jsx</h3>
            {renderGrid()}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <StatSubmit open={open} setOpen={setOpen} stats={stats} successToast={successToast} setTab={setTab}/>

            <ToastContainer theme="dark"/>
        </>
    )
}
