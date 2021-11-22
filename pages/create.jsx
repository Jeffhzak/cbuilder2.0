import React from 'react'
import { atom } from 'jotai';
import { useState } from 'react';
import { Box } from '@mui/system';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { ArrowBack, ArrowForward, BarChartTwoTone, GroupsTwoTone, HandymanTwoTone, ImageTwoTone, LandscapeTwoTone, PersonOutlineTwoTone } from '@mui/icons-material';
import { Class } from '../components/Class/Class';
import { Race } from '../components/Race/Race';
import { Background } from '../components/Background/Background';
import { Stats } from '../components/Stats/Stats';
import { CharSheet } from '../components/CharSheet/CharSheet';
import { CharPic } from '../components/CharPic/CharPic';
import axios from "axios";
import { classApiGet } from '../components/Class/classApiGet';
import { raceApiGet } from '../components/Race/raceApiGet';
import { backgroundApiGet } from '../components/Background/backgroundApiGet';
import { statsApiGet, skillsApiGet } from '../components/Stats/statsApiGet';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const sidebarWidthCollapsed = "5em";
export const tempCharacterAtom = atom({
  fromClass: {},
  fromRace: {},
  fromBackground: {},
  baseStats: {},
});

const Create = ({allClassInfo, allRaceInfo, allBackgroundInfo, allStatsInfo, allSkillsInfo}) => {
  const tempFunc = () => {
    console.log("allClassInfo",allClassInfo);
    console.log("allRaceInfo",allRaceInfo);
    console.log("allBackgroundInfo",allBackgroundInfo);
    console.log("allStatsInfo",allStatsInfo);
    console.log("allSkillsInfo",allSkillsInfo);
  }

  const [collapsed, setCollapsed] = useState(true)

  const [tab, setTab] = useState(1);

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const changeTab = (tabnum) => () => {
    setTab(tabnum);
  }

  const successToast = (textToPrint) => {
      toast.success(`${textToPrint}`, {
        position: "top-center",
        autoClose: 4000,
    })
  }

  const renderPage = () => {
    if (tab === 1) return (<Class allClassInfo={allClassInfo} successToast={successToast}/>);
    if (tab === 2) return (<Race allRaceInfo={allRaceInfo} successToast={successToast}/>);
    if (tab === 3) return (<Background allBackgroundInfo={allBackgroundInfo} successToast={successToast}/>);
    if (tab === 4) return (<Stats allStatsInfo={allStatsInfo} successToast={successToast}/>);
    if (tab === 5) return (<CharPic successToast={successToast}/>);
    if (tab === 6) return (<CharSheet successToast={successToast}/>);
  }

  return (
        <>
        <Box sx={{width:"100%", display:"flex"}}>
          <Box sx={{ height:"95vh", margin:"-1.5em", position:"absolute" }}>
            <ProSidebar
            collapsed={collapsed}
            width="20em"
            collapsedWidth={sidebarWidthCollapsed}>
              <Menu iconShape="round" >
                <MenuItem icon={collapsed ? <ArrowForward/> : <ArrowBack/>} onClick={handleCollapse}>Minimize Sidebar</MenuItem>
              </Menu>

              <Menu iconShape="round" >
                <MenuItem icon={<HandymanTwoTone/>} onClick={changeTab(1)}>Class</MenuItem>
                <MenuItem icon={<GroupsTwoTone/>} onClick={changeTab(2)}>Race</MenuItem>
                <MenuItem icon={<LandscapeTwoTone/>} onClick={changeTab(3)}>Background</MenuItem>
                <MenuItem icon={<BarChartTwoTone/>} onClick={changeTab(4)}>Ability Scores</MenuItem>
                <MenuItem icon={<ImageTwoTone/>} onClick={changeTab(5)}>Picture</MenuItem>
              </Menu>

              <Menu iconShape="round" >    
                <MenuItem icon={<PersonOutlineTwoTone/>} onClick={changeTab(6)}>Character Summary</MenuItem>
              </Menu>
            </ProSidebar>
          </Box>
          <Box  sx={{width:sidebarWidthCollapsed}}>
          </Box>
          <Box sx={{width:"95%", maxWidth:"95%", ml: "2em", mr:"2em"}}>
          <h1>Create.jsx</h1>
          <button onClick={tempFunc}>log props</button>
          {renderPage()}
          </Box>
        </Box>

        <ToastContainer theme="dark"/>
        </>
    )
}

export default Create;

export async function getStaticProps() {

  const URL = "https://www.dnd5eapi.co";

  //! Class Info
  const classRes = await axios.get(`${URL}/api/classes`);
  const allClassInfo = {};
  for (const thisClass of classRes.data.results) {
      const className = thisClass.index;
      
      const thisClassInfo = await classApiGet(className);
      
      allClassInfo[className] = thisClassInfo;
  }
  
  //! Race Info
  const raceRes = await axios.get(`${URL}/api/races`);
  const allRaceInfo = {};
  for (const thisRace of raceRes.data.results) {
    const raceName = thisRace.index;

    const thisRaceInfo = await raceApiGet(raceName);

    allRaceInfo[raceName] = thisRaceInfo;
  }

  //! Background Info
  const backgroundRes = await axios.get(`${URL}/api/backgrounds`);
  const allBackgroundInfo = {};
  for (const thisBackground of backgroundRes.data.results) {
    const backgroundName = thisBackground.index;

    const thisBackgroundInfo = await backgroundApiGet(backgroundName);

    allBackgroundInfo[backgroundName] = thisBackgroundInfo;
  }

  //! Stats Info
  const statsRes = await axios.get(`${URL}/api/ability-scores`);
  const allStatsInfo = {};
  for (const thisStat of statsRes.data.results) {
    const statName = thisStat.index;

    const thisStatInfo = await statsApiGet(statName);

    allStatsInfo[statName] = thisStatInfo;
  }

  //! Skills Info
  const skillRes = await axios.get(`${URL}/api/skills`);
  const allSkillsInfo = {};
  for (const thisSkill of skillRes.data.results) {
    const skillName = thisSkill.index;

    const thisSkillInfo = await skillsApiGet(skillName);

    allSkillsInfo[skillName] = thisSkillInfo;
  }

  return {  
    props: {
      allClassInfo: allClassInfo,
      allRaceInfo: allRaceInfo,
      allBackgroundInfo: allBackgroundInfo,
      allStatsInfo: allStatsInfo,
      allSkillsInfo: allSkillsInfo,
    }
  }
}