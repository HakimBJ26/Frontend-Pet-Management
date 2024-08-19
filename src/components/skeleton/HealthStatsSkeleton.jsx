import { Box, Skeleton, Typography } from '@mui/material';
import '../../styles/VetAppointments.css';
function HealthStatsSkeleton() {
  return (
    <Box className="countainer" sx={{ paddingX: 2 }}>
      <Typography variant="h4" fontWeight="bold">
      Health Stats
      </Typography>

      <Box sx={{ width: '100%', height: 200, marginTop: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    </Box>
  );
}

export default HealthStatsSkeleton;
