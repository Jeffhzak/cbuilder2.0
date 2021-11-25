import React from 'react'
import { useAuth } from "./AuthContext";
import { AppBar, Button, Divider, Slide, Toolbar, Typography } from '@mui/material';
import { useScrollTrigger } from '@mui/material';
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import Image from 'next/image';
import { Box } from '@mui/system';

export const Appbar = (props) => {

    const router = useRouter();
    const { currentUser, userData, logout } = useAuth();

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
        
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar sx={{gap:"0em 1em"}}>
            <Box sx={{width:"40px", height:"40px", flexShrink:0}}>
            <Link href="/"><a><Image src="/dndlogo.png" alt="logo" width="40px" height="40px"/></a></Link>
            </Box>

            <Link href="/create"><Button sx={{color:"white", flexShrink:0}}>Create a Character!</Button></Link>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Link href="/mychars"><Button sx={{color:"white", flexShrink:0}}>My Characters</Button></Link>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Link href="/custom-options"><Button sx={{color:"white", flexShrink:0}}>My Custom Options</Button></Link>
            <button onClick={()=>{console.log(userData)}}>userData</button>
            <Box sx={{display:"flex", flexDirection:"row-reverse", width:"100%"}}>
            { !!currentUser?.email 
            ?
            <>
            <Button onClick={handleLogout} sx={{color:"white"}}>Log Out</Button>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Button sx={{color:"white"}} disabled={currentUser?.email ? null : true}>{userData?.userName}</Button>
            </>
            :
            <Button onClick={()=>{router.push("/login")}} sx={{color:"white"}}>Log In</Button>}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
        </>
    )
}
