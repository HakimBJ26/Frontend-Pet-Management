import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Container, Button } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon,  Storefront as StorefrontIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { ADMIN_DASH_PATH, MANAGE_VETO_REQUEST, PET_SHOP_MANAGEMENT, USER_MANAGEMENT_PATH } from '../../common/configuration/constants/Paths';
import ImageUploader from '../../components/global/ImageUploader';

const drawerWidth = 240;

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={() => document.getElementById('user-management').scrollIntoView()}>
          <DashboardIcon />
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem button onClick={() => document.getElementById('vet-requests').scrollIntoView()}>
          <AccountCircleIcon />
          <ListItemText primary="Vet Requests" />
        </ListItem>
        <ListItem button onClick={() => document.getElementById('pet-shop').scrollIntoView()}>
          <StorefrontIcon />
          <ListItemText primary="Pet Shop Management" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the admin dashboard. Use the sidebar to navigate to different sections.
          </Typography>

          {/* User Management Section */}
          <Box
            id="user-management"
            sx={{ my: 5, py: 5, backgroundColor: `${colors.primary[400]}`, borderRadius: 2, width: '100%' }}
          >
            <Container>
              <Typography variant="h5" gutterBottom>
                User Management
              </Typography>
              <Typography variant="body1" paragraph>
                Manage user accounts, review user details, and update user information.
              </Typography>
              <Button variant="contained" color="inherit" onClick={() => {
                navigate(`${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`)
              }}>
                Go to User Management
              </Button>
            </Container>
          </Box>

          {/* Vet Requests Section */}
          <Box
            id="vet-requests"
            sx={{ my: 5, py: 5, backgroundColor: `${colors.secondary[400]}`, borderRadius: 2, width: '100%' }}
          >
            <Container>
              <Typography variant="h5" gutterBottom>
                Vet Account Requests
              </Typography>
              <Typography variant="body1" paragraph>
                Review and approve veterinarian account creation requests.
              </Typography>
              <Button variant="contained" color="inherit" onClick={() => {
                navigate(`${ADMIN_DASH_PATH}${MANAGE_VETO_REQUEST}`)
              }}>
                Manage Vet Requests
              </Button>
            </Container>
          </Box>

          {/* Pet Shop Management Section */}
          <Box
            id="pet-shop"
            sx={{ my: 5, py: 5, backgroundColor: `${colors.neutral[400]}`, borderRadius: 2, width: '100%' }}
          >
            <Container>
              <Typography variant="h5" gutterBottom>
                Pet Shop Management
              </Typography>
              <Typography variant="body1" paragraph>
                Manage pet shop inventory, update product details, and monitor stock levels.
              </Typography>
              <Button variant="contained" color="inherit" onClick={() => {
                navigate(`${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENT}`)
              }}>
                Go to Pet Shop Management
              </Button>
            </Container>
          </Box>
        </Container>
        <ImageUploader/>
      </Box>
    </Box>
  );
}

export default Dashboard;
