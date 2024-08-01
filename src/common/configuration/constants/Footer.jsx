import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Box, IconButton } from '@mui/material';

const Footer = () => {
  return (
    <Box  sx={{
        position: 'fixed',
        bottom: 0,
         right:'-1%',
        width: '85%',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderTop: '1px solid #ddd',
        boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.2)',}}>
      <IconButton>
        <HomeIcon sx={{ color: 'black' }} />
      </IconButton>
      <IconButton>
        <DirectionsRunIcon sx={{ color: 'black' }} />
      </IconButton>
      <IconButton>
        <HeartBrokenIcon sx={{ color: 'black' }} />
      </IconButton>
      <IconButton>
        <AddToPhotosIcon sx={{ color: 'black' }} />
      </IconButton>
    </Box>);};
export default Footer;

