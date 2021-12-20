import React from 'react'
import { useState, useCallback } from 'react'
import { useAtom } from 'jotai'
import { tempCharacterAtom } from '../../pages/create'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import axios from "axios";



export const CharPic = ({successToast, setTab}) => {

    const [tempCharacter, setTempCharacter] = useAtom(tempCharacterAtom);
    const [url, setURL] = useState("");
    const [imagePreviewURL, setImagePreviewURL] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);

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

    const onDrop = useCallback(
        (acceptedFiles) => {
            setUploadedFiles([...uploadedFiles, acceptedFiles[0]]);
        },
        [uploadedFiles]
    )

    const {getRootProps, getInputProps} = useDropzone(
        {
            onDrop,
            accepts: "image/*",
            multiple: false,
            maxFiles: 1,
        }
    );

    const imageSrcLogic = () => {
        if (uploadedFiles.length > 0) return URL.createObjectURL(uploadedFiles[0]);
        if (imagePreviewURL.length > 0) return `/api/imageproxy?url=${encodeURIComponent(imagePreviewURL)}`;
        else return "/placeholder-image.png";
    }

    const clearImage = () => {

        setUploadedFiles([]);
        setImagePreviewURL("");
        setURL("");
    }

    return (
        <div className="page_wrapper">
            {/* <h1>CharPic.jsx</h1> */}

            <Box sx={{m: "1em", width:"250px"}}> 
                {uploadedFiles?.length < 1
                ?
                <div
                    {...getRootProps()}
                    style={{
                        height: "250px",
                        border: "2px dashed #b1a7a6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <input {...getInputProps()} />
                    <span> Upload an image here </span>
                </div>
                :
                null
                }
            </Box>
            <Button onClick={() => console.log(uploadedFiles)}>uploadedFiles</Button>
            <Typography variant="h6" sx={{mt:"1em", mb:"1em"}}> OR </Typography>
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
                <div 
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 1,
                    backgroundColor: "black",
                    width: "1.5em",
                    height: "1.5em",
                    display: "flex",
                    alignItems:"center",
                    justifyContent:"center",
                }}
                onClick={clearImage}
                >
                    <i>
                        X
                    </i>
                </div>
                <Image 
                // src={
                //     imagePreviewURL.length > 0
                //     ?
                //     `/api/imageproxy?url=${encodeURIComponent(imagePreviewURL)}`
                //     :
                //     "/placeholder-image.png"
                //     } 
                src={imageSrcLogic()}
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
