import React from 'react';
import { Box, Grid, Skeleton, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@emotion/react';

const SkeletonMarketplace = () => {
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: '50px', padding: '10px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Skeleton width="200px" />
      </Typography>
      
      <Box sx={{ marginBottom: '20px' }}>
        <Skeleton variant="rectangular" height={40} width="100%" />
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '50px' }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ padding: 2 }}>
              <Skeleton width="60%" height={30} />
              <Skeleton width="40%" height={20} sx={{ marginTop: 1 }} />
              <Skeleton variant="rectangular" height={30} sx={{ marginTop: 2 }} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: theme.palette.grey[200],
          boxShadow: theme.shadows[3],
        }}
      >
        <Badge badgeContent={<Skeleton variant="text" width={20} height={20} />} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

   
    </Box>
  );
};

export default SkeletonMarketplace;
