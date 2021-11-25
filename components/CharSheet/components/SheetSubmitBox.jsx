import React from 'react'
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';


export const SheetSubmitBox = ({open, setOpen, text, func}) => {

    const handleSubmitClose = () => {
        setOpen(false);
    }

    return (
        <>
            <h1>SheetSubmitBox.jsx</h1>
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
                        {text}
                    </Typography>
                    <Button onClick={func}>Yes!</Button>
                    <Button onClick={handleSubmitClose}>No, take me back.</Button>
                </Box>
            </Modal>  
        </>
    )
}
