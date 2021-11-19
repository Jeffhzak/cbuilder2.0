import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { CreateDefaultBtns } from '../../utility/CreateDefaultBtns'

export const ClassSummary = ({choices}) => {
    // console.log(choices)

    return (
        <>
        <Box sx={{width:"100%"}}>
            <Typography variant="h6" mt="1em">Saving Throws:</Typography>
            <Divider/>
            <CreateDefaultBtns inputArray={choices?.selectedClassInfo.saving_throws} />
            <Typography variant="h6" mt="1em">Features gained:</Typography>
            <Divider/>
            <CreateDefaultBtns inputArray={choices?.selectedClassInfo.features}/>
            {choices?.selectedClassInfo.proficiencies.length
            ?
            <>
            <Typography variant="h6" mt="1em">Proficiencies automatically gained:</Typography>
            <Divider/>
            <CreateDefaultBtns inputArray={choices?.selectedClassInfo.proficiencies}/>
            </>
            :
            null}
            <Typography variant="h6" mt="1em">Proficiencies chosen:</Typography>
            <Divider/>
            {choices?.proficiencies?.length
            ?
            <>
            <CreateDefaultBtns inputArray={choices?.proficiencies}/>
            </>
            :
            <Typography color="text.secondary" variant="subtitle2">None chosen.</Typography>}
            
        </Box>
        </>
    )
}
