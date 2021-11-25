import { Card, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { BasicCard } from "../../components/utility/BasicCard"
import { useAuth } from "../../components/AuthContext";

const CustomOptions = () => {

    const { currentUser, userData, setUserData } = useAuth();
    const customBGs = userData?.custom_backgrounds;

    const renderCustomBGs = () => {
        console.log(customBGs)
        console.log("renderCustomBGs fired")
        if (!!customBGs && (customBGs?.length >= 1)) {
            console.log("if statement fired")

            return customBGs.map((bgObj, index) => {
                return (
                    <BasicCard key={`${bgObj.name}_${bgObj.creator}`} text={bgObj.name} imageSrc="/placeholder-image.png" linkHref={`/custom-options/background/${index}`} />
                )
            })
        }
    }

 return(
    <Box className="page_wrapper">
    {/* <h1>CustomOptions.js</h1> */}
    <Typography variant="h5" mt="1em">{"Create a new custom option!"}</Typography>
    <Divider/>
    <Box sx={{display:"flex"}}>
        <BasicCard text="Create Custom Background" imageSrc="/placeholder-image.png" linkHref="/custom-options/background" />
        {/* <BasicCard text="Create Custom Race" imageSrc="/placeholder-image.png" linkHref="/custom-options/race" /> */}
    </Box>
    <Typography variant="h5" mt="1em">{"My Custom Backgrounds:"}</Typography>
    <Divider/>
    {renderCustomBGs()}
    </Box>
 )   
}

export default CustomOptions;