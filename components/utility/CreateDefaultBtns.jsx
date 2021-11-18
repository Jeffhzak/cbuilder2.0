import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'


const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
  }
  
export const CreateDefaultBtns = ({inputArray}) => {

    const btnArrayRender = inputArray?.map((arrayStep, index) => {

        return (
            <Button key={`${arrayStep}yhdjc${index}`} variant="contained" color="success" sx={{m:"0.5em"}}>{arrayStep?.name}</Button>
            
        )
    });
    return (
        <>
        <Box sx={rowStyle}>
            {btnArrayRender}
        </Box>
        </>
    )
}
