import React from 'react'
import { useAuth } from "./AuthContext";
import { AppBar, Button, Divider, Slide, Toolbar, Typography } from '@mui/material';
import { useScrollTrigger } from '@mui/material';
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";

export const Appbar = (props) => {

    const router = useRouter();
    const { currentUser, logout } = useAuth();

    function HideOnScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
        });
        return (
            <Slide appear={false} direction="down" in={!trigger}>
            {children}
            </Slide>
        );
    }

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
            
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
      <HideOnScroll {...props}>
        
        <AppBar>
          <Toolbar sx={{gap:"0em 1em"}}>
              
            <Button sx={{color:"white"}}>Create a Character!</Button>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Button sx={{color:"white"}}>My Characters</Button>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Button sx={{color:"white"}}>Import a Character</Button>
            <Typography variant="h7">{currentUser?.email}</Typography>
            { !!currentUser?.email 
            ?
            <Button onClick={handleLogout} sx={{color:"white"}}>Log Out</Button>
            :
            <Button onClick={()=>{router.push("/login")}} sx={{color:"white"}}>Log In</Button>}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
        </>
    )
}
