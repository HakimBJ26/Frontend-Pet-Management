import React from 'react';
import { Paper, Typography, Button, Box, Skeleton } from '@mui/material';
import "../../styles/HealthAlerts.css";

const HealthAlertsSkeleton = () => {
  return (
    <Box className="health-alerts-container">
      {Array.from(new Array(3)).map((_, index) => (
        <Paper key={index} className="health-alert-paper" style={{ padding: '16px', marginBottom: '16px' }}>
          <Box className="health-alert-header">
            <Typography variant="h5" fontWeight="bold">
              <Skeleton variant="text" width={120} />
            </Typography>
            <Typography className="health-alert-severity">
              <Skeleton variant="text" width={80} />
            </Typography>
          </Box>
          <Typography textAlign="center" minHeight={40}>
            <Skeleton variant="text" width="60%" />
          </Typography>
          <Button variant="contained" fullWidth color="success" disabled>
            <Skeleton variant="text" width={80} />
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default HealthAlertsSkeleton;
