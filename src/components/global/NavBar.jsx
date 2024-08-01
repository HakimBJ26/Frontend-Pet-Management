import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonPinIcon from '@mui/icons-material/PersonPin';
const NavBar = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
         padding: '5px 20px',
        borderBottom: '1px solid #ccc', 
        backgroundColor: '#fff',
        position: 'fixed',
        width: '80%',
        bottom: 790,
        left: 250,
        height: '40px',
        zIndex: 1000,
        boxSizing: 'border-box'}} >
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}> 
        Petagora
      </Typography>
      <Box>
        <IconButton sx={{ color: 'black' }}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ color: 'black' }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ color: 'black' }}>
          <PersonPinIcon />
        </IconButton>
      </Box>
    </Box>
    );};
export default NavBar;
