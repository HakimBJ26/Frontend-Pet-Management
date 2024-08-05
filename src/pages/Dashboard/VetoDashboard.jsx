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
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Container
              style={{
                textAlign: 'center',
                padding: '8px',
                backgroundColor: 'default',
                minHeight: '100vh',
              }}
            >
              <Typography
                variant="h1"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  marginTop: '10%',
                  color: theme.palette.primary.main,
                }}
              >
                Welcome to Petagora
              </Typography>

              <Typography
                variant="h5"
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '4rem',
                  color: theme.palette.secondary.main,
                }}
              >
                "Easily access all essential features to provide the best care for your furry patients. Manage appointment requests, update medical notes, and track pets' health and activities in real-time."
              </Typography>

              <Grid container  spacing={4} style={{ maxWidth: 1100, padding: '8px', backgroundColor: theme.palette.background.paper }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ maxWidth: 345, margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage11}
                      title="Appointment Management"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Appointment Management
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Receive and manage appointment requests from pet owners easily.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ maxWidth: 345, margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage22}
                      title="Medical Notes"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Medical Notes
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update medical notes and treatment plans after consultations.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ maxWidth: 345, margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage33}
                      title="Real-Time Tracking"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Real-Time Tracking
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Track pets' health and activities in real-time.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default VetoDashboard;
