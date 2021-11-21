import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Popover } from '@mui/material';

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

const StatDesc = ({stat, statDesc}) => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);


    const statExplanation = statDesc[stat]?.desc.map((arrayStep, index) => {
        return <Typography key={`zxczxcv`+`${index}`} id="modal-modal-description" sx={{ mt: 2 }}>
            {arrayStep}
        </Typography>
    })

    const assocSkills = statDesc[stat]?.skills.length > 0 ?
    statDesc[stat]?.skills.map((arrayStep, index) => {
        return <li key={`${arrayStep.name}`+`${index}`}>{arrayStep.name}</li>
    })
    : <li>None</li>


    const open = Boolean(anchorEl);

    return (
        <>
        <HelpIcon onMouseEnter={handleOpen} onMouseLeave={handleClose}/>
        <Popover
            id="mouse-over-popover"
            sx={{
            pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handleClose}
            disableRestoreFocus
            disableScrollLock
        >
            <Box sx={{p:"1em", maxWidth:"30em"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {statDesc[stat]?.full_name}
                </Typography>
                {statExplanation}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Skills associated with {statDesc[stat]?.full_name}:
                </Typography>
                {assocSkills}
            </Box>
        </Popover>
        </>
    )
}

export default StatDesc
