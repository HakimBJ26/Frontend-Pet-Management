import { Container, Typography, Box } from '@mui/material'
import homepage from '../../images/homepage.png'
import { useTheme } from '@mui/material/styles'
import { tokens } from '../../theme';
import '../../styles/ClientDashboard.css'

function ClientDashboard() {
  const theme = useTheme();
  const colors = tokens()


  return (
    <Box
    className="background-box"
      sx={{
        backgroundImage: `url(${homepage})`,
        backgroundColor: colors.secondary[600],
      }}
    >
      <Container maxWidth="lg" sx={{ mt: '80px'}}>
        <Box sx={{marginBottom:5}}>
        <Typography variant="h2" color="black" fontWeight='bold'>
          PETAGORA
        </Typography>
    
        </Box>
        <Typography variant="h2" color={theme.palette.grey[300]} textAlign='center'>
        Helping you<br/>
        to keep your <b>bestie</b><br/>
        stay healthy!
        </Typography>
      </Container>
    </Box>
  );
}

export default ClientDashboard;
