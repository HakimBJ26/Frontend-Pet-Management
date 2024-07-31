import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { SUBMIT_VETO_REQUEST } from '../../common/configuration/constants/Paths';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      PETAGORA
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box className="footer-container">
      <Box
        component="footer"
        className="footer-content"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          '--footer-bg-color': (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Link color="inherit" href={SUBMIT_VETO_REQUEST}>
              Submit a request to join as a Veterinarian
            </Link>
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
