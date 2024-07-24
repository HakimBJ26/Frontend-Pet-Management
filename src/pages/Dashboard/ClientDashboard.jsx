import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import PetImage8 from '../../images/PetImage8.jpg';
import PetImage6 from '../../images/PetImage6.jpg';
import PetImage9 from '../../images/PetImage9.jpg';
import {  useTheme } from '@mui/material/styles';



function ClientDashboard() {
  const theme = useTheme();

  return (
            <Container
              style={{
                textAlign: 'center',
                backgroundColor: 'default',
                marginTop:'30px'

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
                Bienvenue sur Petagora
              </Typography>

              <Typography
                variant="h5"
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '4rem',
                  color: theme.palette.secondary.main,
                }}
              >
                "Our platform provides comprehensive tracking for your pet, including dietary management, health monitoring, real-time location tracking with veterinarian oversight, and activity tracking."
              </Typography>
              <Grid container spacing={4} style={{ padding: '8px', backgroundColor: theme.palette.background.paper }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage8}
                      title="Health Monitoring"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Health Monitoring
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Keep track of your pet's health with regular updates and reminders.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card style={{ margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage6}
                      title="GPS Tracking"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        GPS Tracking
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monitor your pet's location in real-time to ensure their safety.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PetImage9}
                      title="Diet Management"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Diet Management
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manage and track your pet's diet to keep them healthy and happy.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

            </Container>
 
  );
}

export default ClientDashboard;
