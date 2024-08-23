import React from 'react';
import { Paper, Typography, Box, Skeleton } from '@mui/material';

const VitalSignsSkeleton = () => {
  return (
    <Paper style={{ padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" flexDirection='row'>
        <Box display="flex" justifyContent="space-between" mb={1} gap={1} flexDirection='column'>
          <Typography variant='h5' fontWeight='bold'>Heart Rate</Typography>
          <Skeleton variant="text" width={60} />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1} flexDirection='column'>
          <Typography variant='h5' fontWeight='bold'>Temperature</Typography>
          <Skeleton variant="text" width={60} />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1} flexDirection='column'>
          <Typography variant='h5' fontWeight='bold'>Activity Level</Typography>
          <Skeleton variant="text" width={60} />
        </Box>
      </Box>
      <Typography marginTop="10px" variant="body2" color="textSecondary">
        Last Updated: <Skeleton variant="text" width={100} />
      </Typography>
    </Paper>
  );
};

export default VitalSignsSkeleton;
