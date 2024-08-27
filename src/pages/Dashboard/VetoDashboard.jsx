import { useContext } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CssBaseline } from '@mui/material';
import PetImage11 from '../../images/PetImage11.jpg';
import PetImage22 from '../../images/PetImage22.jpg';
import PetImage33 from '../../images/PetImage33.jpg';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../theme';

function VetoDashboard() {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
 <>
 </>
  );
}

export default VetoDashboard;
