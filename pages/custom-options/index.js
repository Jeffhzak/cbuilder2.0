import { Box } from '@mui/system';
import React from 'react'
import { BasicCard } from "../../components/utility/BasicCard"

const CustomOptions = () => {
 return(
     <>
     <h1>CustomOptions.js</h1>
     <Box sx={{display:"flex"}}>
        <BasicCard text="Create Custom Race" imageSrc="/placeholder-image.png" linkHref="/custom-options/race" />
        <BasicCard text="Create Custom Background" imageSrc="/placeholder-image.png" linkHref="/custom-options/background" />
     </Box>
     </>
 )   
}

export default CustomOptions;