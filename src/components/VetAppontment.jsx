import { Box, Skeleton, Typography } from '@mui/material';
import '../styles/VetAppointments.css';

function VetAppointments({ appointmentsData }) {
    if(!appointmentsData) return 

    const { lastAppointment, weightComparison, bodyComparison, tailComparison, chestComparison } = appointmentsData;

    return (
        <Box className='countainer-pet-health-details' >
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Vet Appointments
            </Typography>
            <Box className='vet-appointments-box'
            >
                <Box sx={{display:'flex', alignItems:'start',flexDirection:'column'}}>
                    <Typography variant="h6" >Weight</Typography>
                    <Typography variant="h6" >Body</Typography>
                    <Typography variant="h6" >Tail</Typography>
                    <Typography variant="h6" >Chest</Typography>
                </Box>

             
                <Box>
                    <Typography variant="h5" fontWeight="bold">{lastAppointment?.weight} kg</Typography>
                    <Typography variant="h5" fontWeight="bold">{lastAppointment?.body} %</Typography>
                    <Typography variant="h5" fontWeight="bold">{lastAppointment?.tail} cm</Typography>
                    <Typography variant="h5" fontWeight="bold">{lastAppointment?.chest} cm</Typography>
                </Box>

             
                <Box>
                    <Typography variant="h5" fontWeight="bold">{weightComparison}</Typography>
                    <Typography variant="h5" fontWeight="bold">{bodyComparison}</Typography>
                    <Typography variant="h5" fontWeight="bold">{tailComparison}</Typography>
                    <Typography variant="h5" fontWeight="bold">{chestComparison}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default VetAppointments;
