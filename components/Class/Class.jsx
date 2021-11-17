import { Card } from '@mui/material';
import React from 'react'
import { useState } from "react"

export const Class = ({allClassInfo}) => {

    // console.log("class.jsx", allClassInfo);
    const [playerClass, setPlayerClass] = useState("");

    const renderClassChoice = (allClassInfo) => {
        
        const classIndexArray = Object.keys(allClassInfo);
        const classCardRender = classIndexArray.map((classIndex) => {
            const thisClassInfo = allClassInfo[classIndex];
            // console.log(thisClassInfo);

            return (
                <Card key={thisClassInfo.class.index+"erwrewr"}>
                    
                </Card>
            )
        })
    }
    return (

        <>
            <h1>Class.jsx</h1>
            {renderClassChoice(allClassInfo)}
        </>
    )
}
