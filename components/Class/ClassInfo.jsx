import React from 'react'
import { Button, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState, useLayoutEffect } from "react";
import { ClassFeatures } from './tabs/ClassFeatures';
import { ClassOptions } from './tabs/ClassOptions';
import { ClassSummary } from './tabs/ClassSummary';
import { ClassSubmitBox } from './components/ClassSubmitBox.jsx';


export const ClassInfo = ({ playerClass, setPlayerClass, selectedClassInfo, successToast }) => {
    useLayoutEffect(() => {
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: "smooth"
      })
    }, [playerClass])

    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [choices, setChoices] = useState(
      {
        selectedClassInfo: selectedClassInfo,
      });

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    const handleSubmitOpen = () => {
      setOpen(true);
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }
      
      function allyProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
        <>
            <h1>ClassInfo.jsx</h1>
            <Button variant="contained" onClick={()=>{setPlayerClass("")}}>Go Back</Button>
            <Button variant="contained" onClick={()=>{console.log(selectedClassInfo)}}>Log ClassInfo</Button>
            <Button variant="contained" onClick={()=>{console.log(choices)}}>Log Choices</Button>
            <Box sx={{width: "100%"}}>
                <Typography variant="h5">You selected:</Typography>
                <Typography variant="h5">The {selectedClassInfo?.class.name}</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button onClick={handleSubmitOpen} variant="contained" color="secondary">Submit Selection</Button>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Features" {...allyProps(0)} />
                    <Tab label="Class Options" {...allyProps(1)} />
                    <Tab label="Summary" {...allyProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <ClassFeatures selectedClassInfo={selectedClassInfo} choices={choices} setChoices={setChoices}/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <ClassOptions selectedClassInfo={selectedClassInfo} choices={choices} setChoices={setChoices}/>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <ClassSummary choices={choices} />
                </TabPanel>
            </Box>
            <ClassSubmitBox open={open} setOpen={setOpen} choices={choices} successToast={successToast}/>
        </>
    )
}
