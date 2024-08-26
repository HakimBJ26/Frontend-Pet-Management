import React from 'react';
import { Paper, Typography, Box, Skeleton } from '@mui/material';
import { VITAL_PET_FIELD } from '../../common/configuration/constants/CategoriesToSearch';

const VitalSignsSkeleton = () => {
  const VitalSignSkeleton = ({ label }) => (
    <Box display="flex" flexDirection="column" justifyContent="space-between" mb={1} gap={1}>
      <Typography variant='h5' fontWeight='bold'>{label}</Typography>
      <Skeleton variant="text" width={60} />
    </Box>
  );

  return (
    <Paper style={{ padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between">
        {VITAL_PET_FIELD.map((label) => (
          <VitalSignSkeleton key={label} label={label} />
        ))}
      </Box>
      <Typography marginTop="10px" variant="body2" color="textSecondary">
        Last Updated: <Skeleton variant="text" width={100} />
      </Typography>
    </Paper>
  );
};

export default VitalSignsSkeleton;
