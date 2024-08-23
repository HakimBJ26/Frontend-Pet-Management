import React from 'react';
import { Box, Card, CardContent, Typography,  IconButton, Skeleton } from '@mui/material';


const SetActivityGoalsSkeleton = () => {
  return (
    <Box marginTop={10} alignItems="center" p={2}>
      <Card sx={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
        <Box sx={{ p: 2, position: 'relative' }}>
          <Typography variant="h6" textAlign="center">
            <Skeleton width="60%" />
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" mt={2} flexDirection="column">
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', marginTop: 2, width: '60%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: 1, width: '40%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: 1, width: '40%' }} />
          </Box>

          <IconButton
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Skeleton variant="circular" width={24} height={24} />
          </IconButton>
        </Box>
        <CardContent sx={{ backgroundColor: '#e0e0e0' }}>
          <Typography variant="body1" textAlign="center" gutterBottom>
            <Skeleton width="80%" />
          </Typography>
          <Skeleton variant="text" sx={{ width: '80%', marginTop: 1 }} />
          <Skeleton variant="text" sx={{ width: '80%', marginTop: 1 }} />
          <Skeleton variant="text" sx={{ width: '80%', marginTop: 1 }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SetActivityGoalsSkeleton;
