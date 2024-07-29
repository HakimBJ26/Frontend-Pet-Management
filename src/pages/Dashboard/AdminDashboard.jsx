import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Container } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Storefront as StorefrontIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useState } from 'react';
import { sections } from '../../common/configuration/constants/AdminSection';
import AdminSection from '../../components/AdminSection';

function Dashboard() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 240px)` } }}>
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
        className='custom-drawer-admin-dash'
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

          {sections.map(section => (
            <AdminSection
              key={section.id}
              id={section.id}
              backgroundColor={colors[section.backgroundColorKey][section.backgroundColorIndex]}
              title={section.title}
              description={section.description}
              navigatePath={section.navigatePath}
              buttonText={section.buttonText}
            />
          ))}
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
