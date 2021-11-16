import React from 'react'
import { Button, Typography } from '@mui/material';
import Link from "next/dist/client/link";

const AlreadyLoggedIn = () => {
    return (
        <>
        <Typography variant="h4" display="inline">You are already logged in! </Typography>
        <Button sx={{display:"block"}}><Link href="/">Return to the main page.</Link></Button> 
        </>
    )
}

export default AlreadyLoggedIn;