import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai'
import React from 'react'
import { tempCharacterAtom } from '../../../pages/create.jsx'

export const BGSubmitBox = ({open, setOpen, choices, successToast, setTab}) => {

    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);

    const handleSubmitClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setTempCharacter({
            ...tempCharacter,
            fromBackground: choices,
        });
        
        successToast("Background successfully submitted!");
        setTab(6);
        setOpen(false);
    }
    return (
        <>
            <h1>BGSubmitBox.jsx</h1>
            <button onClick={()=>{console.log(tempCharacter)}}>log characterAtom</button>
            <Modal
            open={open}
            onClose={handleSubmitClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box 
                className="submitBox"
                sx={{p:4, bgcolor: 'background.paper'}}
                >
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to submit these Background options?
                    </Typography>
                    <Button onClick={handleSubmit}>Yes!</Button>
                    <Button onClick={handleSubmitClose}>No, take me back.</Button>
                </Box>
            </Modal>  
        </>
    )
}
