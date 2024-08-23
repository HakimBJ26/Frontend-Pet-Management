import React from 'react';
import { Box, Paper, Typography, Skeleton } from '@mui/material';

const OverviewSkeleton = () => {
  return (
    <Paper style={{ padding: '16px', marginBottom: '80px' }}>
      <Typography variant="h4" fontWeight='bold' gutterBottom>
        Recent Activities:
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {Array.from(new Array(3)).map((_, index) => (
          <Skeleton key={index} variant="text" width={60} />
        ))}
      </Box>
      <Typography variant="h4" fontWeight='bold' gutterBottom>
        Upcoming Check-ups:
      </Typography>
      <Skeleton variant="text" width={160} />
      <Typography variant="h4" fontWeight='bold' gutterBottom>
        Health Status:
      </Typography>
      <Skeleton variant="circular" width={40} height={40} />
    </Paper>
  );
};

export default OverviewSkeleton;
