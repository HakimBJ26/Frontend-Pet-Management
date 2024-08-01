import React from 'react';
import { Button } from '@mui/material';
const AddSafeZoneButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '15px',
        padding: '10px 20px',
        width: { xs: '70%', sm: '320px' },
        height: '40px',
        position: 'absolute',
        bottom: '540px',
        left: '50.2%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        '&:hover': {
          backgroundColor: 'darkgreen', },
      }} > Set Safe Zone </Button>);};
export default AddSafeZoneButton;
