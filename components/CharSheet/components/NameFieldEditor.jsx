import React from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react';

export const NameFieldEditor = ({charName, setTempCharacter}) => {

    const [edit, setEdit] = useState(false);

    const handleChange = (event) => {
        setTempCharacter(x => x = {
            ...x, 
            name:event.target.value,
        })
    }

    return (
        <Box className="rowStyle" sx={{gap:"1em", height:"4em", minWidth:"16em", maxWidth:"16em", justifyContent:"flex-end"}}>
            {
            edit
            ?

            <TextField
                required
                id="charName"
                label="Character Name"
                variant="filled" 
                value={charName}
                onChange={handleChange}
                sx={{mr:"auto"}}/>
            :
            <Typography component="div" variant="h5" sx={{mr:"auto", wordWrap:"break-word"}}>
                {charName}
            </Typography>
            }
            <Button 
            variant="outlined"
            color={edit ? "success" : "primary"} 
            onClick={()=>setEdit(!edit)}
            sx={{}}>
                {edit ? "OK" : "Edit"}
            </Button>
        </Box>
    )
}
