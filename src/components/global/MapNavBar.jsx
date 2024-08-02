import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import styled from 'styled-components';

const NavBarContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: fixed;
  width: 85%;
  bottom: 790px;
  left: 250px;
  height: 40px;
  z-index: 1000;
  box-sizing: border-box;`;

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
