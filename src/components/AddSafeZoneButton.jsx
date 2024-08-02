import React from 'react';
import { Button, styled } from '@mui/material';
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.neutral.darker,
  borderRadius: '15px',
  padding: '10px 20px',
  width: '70%', 
  height: '40px',
  position: 'absolute',
  bottom: '540px',
  left: '50.2%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  '@media (min-width:600px)': {
   width: '320px',},
}));
const AddSafeZoneButton = ({ onClick }) => {
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}>
      Set Safe Zone
    </StyledButton>
  );
};
export default AddSafeZoneButton;
