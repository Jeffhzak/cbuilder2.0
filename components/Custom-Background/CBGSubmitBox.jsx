import React from 'react'
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const CBGSubmitBox = ({open, setOpen, handleSubmit}) => {

    const handleSubmitClose = () => {
        setOpen(false);
    }
    return (
        <>
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
                        Are you sure you want to save this custom background?
                    </Typography>
                    <Button onClick={handleSubmit}>Yes!</Button>
                    <Button onClick={handleSubmitClose}>No, take me back.</Button>
                </Box>
            </Modal>  
        </>
    )
}
