import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai'
import React from 'react'
import { tempCharacterAtom } from '../../../pages/create.jsx'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    

export const PBSubmit = ({open, setOpen, stats, successToast}) => {

    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);

    const handleSubmitClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setTempCharacter({
            ...tempCharacter,
            baseStats: stats,
        });
        
        successToast("Stats successfully submitted!");
        setOpen(false);
    }
    return (
        <>
            <h1>PBSubmit.jsx</h1>
            <button onClick={()=>{console.log(tempCharacter)}}>log characterAtom</button>
        <Modal
            open={open}
            onClose={handleSubmitClose}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2">
                <Box sx={style}>
                    <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
                        Are you sure you want submit these stats?
                    </Typography>

                    <Button onClick={handleSubmit}>Yes!</Button>
                    <Button onClick={handleSubmitClose}>No, take me back.</Button>
                </Box>
        </Modal>
        </>
    )
}
