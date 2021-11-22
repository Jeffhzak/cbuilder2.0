import React from 'react'
import { useState, useLayoutEffect, useEffect } from 'react'
import { Button, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { BGDescription } from './tabs/BGDescription';
import {bgTable} from "../../references/bgTable";
import { BGOptions } from './tabs/BGOptions';
import { BGSubmitBox } from './components/BGSubmitBox';

export const BackgroundInfo = ({playerBG, setPlayerBG, selectedBGInfo, successToast}) => {
    
    useLayoutEffect(() => {
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: "smooth"
      })
    }, [playerBG])
    
    useEffect(() => {
        //! mutating values for consistency

        if (!!selectedBGInfo.desc === false) {
            selectedBGInfo.desc = bgTable[playerBG].desc;
        }
        
        if (!!selectedBGInfo.feature) {
            selectedBGInfo.features = [{...selectedBGInfo.feature}];
        }

        if (!!selectedBGInfo.ideals.from[0].desc) {
            const flattenedArray = selectedBGInfo.ideals.from.map((arrayStep, index) => {
                return selectedBGInfo.ideals.from[index].desc;
            })

            delete selectedBGInfo.ideals.from;
            selectedBGInfo.ideals.from = flattenedArray;
        }

    },[])


    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [choices, setChoices] = useState(
      {
        selectedBGInfo: selectedBGInfo,
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
            <h1>BackgroundInfo.jsx</h1>
            <Button variant="contained" onClick={()=>{setPlayerBG("")}}>Go Back</Button>
            <Button variant="contained" onClick={()=>{console.log(selectedBGInfo)}}>Log BGInfo</Button>
            <Button variant="contained" onClick={()=>{console.log(choices)}}>Log Choices</Button>
            <Box sx={{width: "100%"}}>
                <Typography variant="h5">You selected:</Typography>
                <Typography variant="h5">The {selectedBGInfo?.name}</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button onClick={handleSubmitOpen} variant="contained" color="secondary">Submit Selection</Button>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Desc & Features" {...allyProps(0)} />
                    <Tab label="Options" {...allyProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <BGDescription selectedBGInfo={selectedBGInfo} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <BGOptions selectedBGInfo={selectedBGInfo} choices={choices} setChoices={setChoices} />
                </TabPanel>
            </Box>
            {/* <RaceSubmitBox open={open} setOpen={setOpen} choices={choices} successToast={successToast}/> */}
            <BGSubmitBox open={open} setOpen={setOpen} choices={choices} successToast={successToast} />
        </>
    )
}
