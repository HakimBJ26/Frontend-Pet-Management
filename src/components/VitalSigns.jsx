import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { formatDateTime } from '../utils/formatDate';

const VitalSigns = ({vitalSignsData}) => {
  
  return (
    <Paper style={{ padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" flexDirection='row'>
      <Box display="flex" justifyContent="space-between" mb={1} gap={1} flexDirection='column'>
        <Typography variant='h5' fontWeight='bold'>Heart Rate</Typography>
        <Typography>{vitalSignsData.heartRate} bpm</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1} flexDirection='column'>
        <Typography variant='h5' fontWeight='bold'>Temperature</Typography>
        <Typography>{vitalSignsData.temperature} °C</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1} flexDirection='column'>
        <Typography variant='h5' fontWeight='bold'>Activity Level</Typography>
        <Typography>{vitalSignsData.activityLevel}</Typography>
      </Box>
      </Box>
      <Typography marginTop="10px" variant="body2" color="textSecondary">Last Updated: {formatDateTime(vitalSignsData.lastUpdated)}</Typography>
    </Paper>
  );
};

export default VitalSigns;
