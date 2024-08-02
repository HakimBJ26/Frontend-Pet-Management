import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { IconButton } from '@mui/material';
import styled from 'styled-components';

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 57.5%;
  transform: translateX(-50%);
  width: 87%;
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 10px;
  border-top: 1px solid #ddd;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);`;
  const Footer = () => {
    return (
      <StyledFooter>
        <IconButton><HomeIcon sx={{color:'black'}}/></IconButton>
        <IconButton><DirectionsRunIcon sx={{color:'black'}}/></IconButton>
        <IconButton><HeartBrokenIcon sx={{color:'black'}}/></IconButton>
        <IconButton><AddToPhotosIcon sx={{color:'black'}}/></IconButton>
      </StyledFooter> );
  };
export default Footer;
