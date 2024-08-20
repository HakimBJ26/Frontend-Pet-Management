import { Box, Skeleton, Typography } from '@mui/material';
import '../../styles/VetAppointments.css';

function VetAppointmentsSkeleton() {
  return (
    <Box className='countainer'>
       <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Vet Appointments
            </Typography>
      <Box className='vet-appointments-box'>
        <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
        </Box>
        <Box>
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
        </Box>
        <Box>
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
        </Box>
      </Box>
    </Box>
  );
}

export default VetAppointmentsSkeleton;
