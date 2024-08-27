import React from 'react';
import { Button, styled } from '@mui/material';
import '../../src/maps.css';

const AddSafeZoneButton = ({ onClick }) => {
  return (
    <Button
      className="add-safe-zone-button"
      variant="contained"
      onClick={onClick}
    >
      Set Safe Zone
    </Button>
  );
};

export default AddSafeZoneButton;
