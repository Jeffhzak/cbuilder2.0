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

const sidebarWidthCollapsed = "5em";
const tempCharacterAtom = atom({});

const Create = ({test}) => {
  console.log("test",test);
  const [collapsed, setCollapsed] = useState(true)

  const [tab, setTab] = useState(1);

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const changeTab = (tabnum) => () => {
    setTab(tabnum);
  }

  const renderPage = () => {
    if (tab === 1) return (<Class/>);
    if (tab === 2) return (<Race/>);
    if (tab === 3) return (<Background/>);
    if (tab === 4) return (<Stats/>);
    if (tab === 5) return (<CharPic/>);
    if (tab === 6) return (<CharSheet/>);
  }

  return (
        <>
        <Box sx={{width:"100%", backgroundColor:"blue", display:"flex"}}>
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
          <Box>
          <h1>Create.jsx</h1>
          <h1>{tab}</h1>
          {renderPage()}
          </Box>
        </Box>
        </>
    )
}

export default Create;

export async function getStaticProps() {
  return {

    
    props: {
      test: "lol"
    }
  }
}