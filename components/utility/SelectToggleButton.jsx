import { Button } from '@mui/material'
import React from 'react'
import {useState, useEffect} from "react"

export default function SelectToggleButton({data, selectedCount, setSelectedCount, limitCap, type, choices, setChoices}) {
    const inChoices = !!choices?.[type]?.find(x => x === data);
    const [selected, setSelected] = useState(inChoices);


    const handleClick = () => {
        // console.log(selectedCount);        
        if(selectedCount < limitCap) {
            if(selected === false) {
                setSelectedCount(x=> x+1);
                setSelected(x=> x=!x); //* flip state of selected
                //* check if object has this key, if no create it, if yes add to it.
                const isKeyInObject = !!choices?.[type] ? [...choices[type], data] : [data]
                // console.log(isKeyInObject);
                const newChoices = {...choices, [type]:isKeyInObject};
                setChoices(newChoices);
                // console.log(choices);
            }
        }
        if(selectedCount <= limitCap) {
            if(selected === true) {
                setSelectedCount(x => x-1);
                setSelected(x=> x=!x); //* flip state of selected
                //* filter out everything except item to remove
                const filteredArray = choices[type].filter((arrayStep) => {
                    return data?.name != arrayStep?.name
                })
                console.log("filteredArray", filteredArray)
                const newChoices = {...choices, [type]:filteredArray};
                setChoices(newChoices);
            }
        }
    }

    return (
        <Button variant={selected?"contained":"outlined"} color={selected?"success":undefined} sx={{m:"0.5em"}} onClick={handleClick}>{data?.name}</Button>
    )
}
