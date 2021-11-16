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
        open={false}
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
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
          <Divider /> 
          <List>
            {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
        </Box>
      </Drawer>
            <h1>Create.jsx</h1>
        </>
    )
}

export default Create;