import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const MapNavBar = () => {
  return (
    <NavBarContainer>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
        Petagora
      </Typography>
      <Box>
        <IconButton sx={{ color: 'black' }}><SearchIcon/></IconButton>
        <IconButton sx={{ color: 'black' }}><NotificationsIcon /></IconButton>
        <IconButton sx={{ color: 'black' }}><PersonPinIcon /> </IconButton>
      </Box>
    </NavBarContainer>
  );
};

export default MapNavBar;