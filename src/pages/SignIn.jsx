import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../theme';
import { useState } from 'react';
import {  useTheme } from '@mui/material';
import UserService from '../service/UserService';
import StyledBox from '../components/StyledBox';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../common/configuration/constants/UserRole';
import CustomToast from '../components/CustomToast';

export default function SignIn() {
 const theme = useTheme()
 const navigate=useNavigate()
  const colors = tokens(theme.palette.mode);
  const [toastMessage, setToastMessage] = useState('');
  const [severity,setSeverity]= useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? (/\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid') : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
    const userData=  await UserService.login(formData.email,formData.password)
  
    setSnackbarOpen(true)
      if (userData.token) {
          localStorage.setItem('token', userData.token)
          localStorage.setItem('role', userData.role)
          setSeverity('success')
          setToastMessage('SignIN performed successfully')
          setTimeout(()=>{
            if(userData.role===ROLE_ADMIN){
              navigate('/dashboard-admin')
          }else if(userData.role===ROLE_CLIENT){
            navigate('/dashboard-client')   
          }else if(userData.role===ROLE_VETO){
            navigate('/dashboard-veterinarian')
          }
          }, 2000);
       
      }else{
        setSeverity('error')
        setToastMessage(userData.message)
      }
    }
  };

  return (
    <StyledBox
    >


          
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <PetsIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid  container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ color: colors.primary[400] }} to="/signup">
              <h3>Don't have an account? Sign Up</h3>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <CustomToast
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={toastMessage}
        severity={severity}
      />
    </StyledBox>
  );
}
