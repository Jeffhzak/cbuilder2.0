import React from 'react'
import { atom } from 'jotai';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, Toolbar } from '@mui/material';
import { Box } from '@mui/system';



const characterAtom = atom({});

const Create = () => {
    return (
        <> 
        <Drawer
        variant="permanent"
        sx={{
          width: "15em",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "15em", boxSizing: 'border-box' }
        }}
      > 
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem>
                  test
              </ListItem>
              <ListItem>
                  test2
              </ListItem>
          </List>
          <Divider /> 
          <List>
          </List>
        </Box>
      </Drawer>
            <h1>Creerwrerwrrwerate.jsx</h1>
        </>
    )
}

export default Create;