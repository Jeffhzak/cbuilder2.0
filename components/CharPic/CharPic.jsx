import React from 'react'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { tempCharacterAtom } from '../../pages/create'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image';


export const CharPic = ({successToast, setTab}) => {

    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);
    const [url, setURL] = useState("");
    const [imagePreviewURL, setImagePreviewURL] = useState("");

    const handleChange = (event) => {
        console.log(event.target.value)
        setURL(event.target.value);
    }

    const handlePreview = () => {
        setImagePreviewURL(url);
    }

    const handleSubmit = () => {
        setTempCharacter(
            {
                ...tempCharacter,
                image_url: url,
            }
        );
        successToast("Picture saved!");
        setTab(6);
    }

    return (
        <div className="page_wrapper">
            {/* <h1>CharPic.jsx</h1> */}
            <Box sx={{display:"flex"}}>
            <TextField
                required
                id="imageurl"
                label="image url"
                variant="filled"
                value={url}
                sx={{mr: "1em"}}
                onChange={handleChange}
            />
            <Button variant="contained" onClick={handlePreview} sx={{mr: "1em"}}>Preview</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
            <Typography color="GrayText" variant="subtitle2" sx={{mt:"1em"}}>Preview:</Typography>
            <Box sx={{width:"250px", height:"250px", position:"relative", backgroundColor:"#07212e"}}>
                <Image 
                src={
                    imagePreviewURL.length > 0
                    ?
                    `/api/imageproxy?url=${encodeURIComponent(imagePreviewURL)}`
                    :
                    "/placeholder-image.png"
                    } 
                alt="preview image" 
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL="/placeholder-image.png"
                />
            </Box>
        </div>
    )
}
