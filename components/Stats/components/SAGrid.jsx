import React from 'react'
import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import StatDesc from './StatDesc'

export const SAGrid = ({statName, statDescriptions, stats, setStats, standardArray, setStandardArray}) => {


    const selectValues = standardArray.map((item) => {
        return (
            <MenuItem value={item} key={`${item}`+"weqeqwr"}>{item}</MenuItem>
        )
    })

    const handleChange = (event) => {
        // console.log(event.target.value)
        const newValue = event.target.value;
        
        // console.log(newValue);
        //* add old value back into array
        const newSA = stats[statName] > 0 ? [...standardArray, stats[statName]] : [...standardArray];
        //* sort new array
        const sortedNewSA = newSA.sort((a, b) => b-a);
        //* remove current selected stat from array
        const standardArrayModified = sortedNewSA.filter(x => x === newValue ? false : true)
        //* set the array
        setStandardArray(standardArrayModified);

        //* only then set the actual stat to selected value
        setStats(x => x = {...stats, [statName]:newValue});
    }

    const handleCancel = () => {
        if(stats[statName] > 0) {
            const newSA = [...standardArray, stats[statName]];
            const sortedNewSA = newSA.sort((a, b) => b-a);
            setStandardArray(sortedNewSA);
            setStats(x => x = {...stats, [statName]:0})
        }
    }

    return (
        <> 
            <Grid container spacing={1} alignItems="center" key={`${statName+"wewewe"}`} mt="1em">
                <Grid item xs={2} s={2} md={2} lg={2}>
                    <StatDesc stat={statName} statDesc={statDescriptions}/>
                </Grid>
                <Grid item xs={2} s={2} md={2} lg={2}>
                    <Typography variant="h5" >{statDescriptions[statName]?.name} </Typography>
                </Grid>
                <Grid item xs={2} s={2} md={2} lg={2}>
                    <Typography variant="h5" >: </Typography>
                </Grid>
                <Grid item xs={2} s={2} md={2} lg={2}>
                    <Typography variant="h5" margin="0 1em 0 -1em">{stats[statName]}</Typography>
                </Grid>
                <Grid item xs={1} s={1} md={1} lg={1}>
                    <Button variant="contained" sx={{ml:"-5vw"}} onClick={handleCancel}>X</Button>
                </Grid>
                <Grid item xs={3} s={3} md={3} lg={3}>
                    <FormControl sx={{minWidth: "10em"}}>
                    <Select 
                    onChange={handleChange} 
                    value={0}
                    displayEmpty
                    >
                        <MenuItem value={0} disabled >Choose One</MenuItem>
                        {selectValues}
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}
