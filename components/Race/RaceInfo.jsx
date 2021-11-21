import React from 'react'
import { useState, useLayoutEffect } from 'react'
import { Button, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { RaceFeatures } from './tabs/RaceFeatures';
import { RaceOptions } from './tabs/RaceOptions';
import { RaceDescription } from './tabs/RaceDescription';
import { RaceSubmitBox } from './components/RaceSubmitBox';

export const RaceInfo = ({ playerRace, setPlayerRace, selectedRaceInfo, successToast }) => {
    
    useLayoutEffect(() => {
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: "smooth"
      })
    }, [playerRace])
    
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [choices, setChoices] = useState(
      {
        selectedRaceInfo: selectedRaceInfo,
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
        <div>
            <h1>RaceInfo.jsx</h1>
            <Button variant="contained" onClick={()=>{setPlayerRace("")}}>Go Back</Button>
            <Button variant="contained" onClick={()=>{console.log(selectedRaceInfo)}}>Log RaceInfo</Button>
            <Button variant="contained" onClick={()=>{console.log(choices)}}>Log Choices</Button>
            <Box sx={{width: "100%"}}>
                <Typography variant="h5">You selected:</Typography>
                <Typography variant="h5">The {selectedRaceInfo?.name}</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button onClick={handleSubmitOpen} variant="contained" color="secondary">Submit Selection</Button>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Description" {...allyProps(0)} />
                    <Tab label="Features" {...allyProps(1)} />
                    <Tab label="Race Options" {...allyProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <RaceDescription selectedRaceInfo={selectedRaceInfo} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <RaceFeatures selectedRaceInfo={selectedRaceInfo} choices={choices} setChoices={setChoices} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <RaceOptions selectedRaceInfo={selectedRaceInfo} choices={choices} setChoices={setChoices} />
                </TabPanel>
            </Box>
            <RaceSubmitBox open={open} setOpen={setOpen} choices={choices} successToast={successToast}/>
        </div>
    )
}
