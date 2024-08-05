import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../../theme';
import { VACCINE_RECORD_PATH } from '../../../common/configuration/constants/Paths';

function HealthPassport() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };




  return (
    <Box
      p={3}
      bgcolor={colors.neutral[10]}
      borderRadius={2}
      boxShadow={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh"
    >
      <Typography marginTop="10px" variant="h3" color={colors.grey[100]} gutterBottom>
        Health Passport
      </Typography>
      <Grid container spacing={2} direction="column" maxWidth="400px">
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.primary[900], color: colors.neutral[100] }}
            fullWidth
            onClick={() => handleNavigate('/dashboard_client/vaccine_records')}
          >
            Vaccine Records
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.primary[900], color: colors.neutral[100] }}
            fullWidth
            onClick={() => handleNavigate('/dashboard_client/medical_records')}
          >
            Medical Records
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.primary[900], color: colors.neutral[100] }}
            fullWidth
            onClick={() => handleNavigate('/dashboard_client/surgery_records')}
          >
            Surgery
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: colors.primary[900], color: colors.neutral[100] }}
            fullWidth
            onClick={() => handleNavigate('/dashboard_client/visit_records')}
          >
            Visit Record
          </Button>
        </Grid>
      </Grid>
      <Box mt={3} width="100%" maxWidth="400px">
        <Typography variant="h6" color={colors.grey[100]} gutterBottom>
          Calendar & Reminders
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color={colors.grey[100]}>
            Set Reminder for Next Appointment
          </Typography>

        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Button
              key={index}
              variant="outlined"
              sx={{
                borderColor: colors.grey[500],
                color: colors.grey[500],
                minWidth: '15px',
                padding: '4px',
                fontSize: '12px'
              }}
            >
              {day}
            </Button>
          ))}
        </Box>
        <Typography variant="caption" color={colors.grey[100]} display="block" mt={1}>
          Tap on a date to set a reminder
        </Typography>
      </Box>
    </Box>
  );
}

export default HealthPassport;