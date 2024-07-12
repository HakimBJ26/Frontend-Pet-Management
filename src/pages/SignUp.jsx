import { useState } from 'react';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import UserService from '../service/UserService';
import { tokens } from '../theme';
import Alert from '@mui/material/Alert';
import StyledBox from '../components/StyledBox/StyledBox';

export default function SignUp() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate=useNavigate()
  const [error,setError]=useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'role') {
      setFormData({
        ...formData,
        role: checked ? value : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = formData.email ? (/\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid') : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.role = formData.role ? '' : 'Role is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
      await UserService.register(formData);
     
       navigate('/signin')   
      
     
      } catch (error) {
        setError(error)
        console.error('Error registering user:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <StyledBox
    
    >
      <Typography variant="h1">PETAGORA</Typography>
      <Divider variant="middle" sx={{ mb: 3 }} />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PetsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">Sign up</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Typography variant="subtitle1">Select Role</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="role"
                    value="client"
                    checked={formData.role === 'client'}
                    onChange={handleChange}
                  />
                }
                label="Client"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="role"
                    value="veterinarian"
                    checked={formData.role === 'veterinarian'}
                    onChange={handleChange}
                  />
                }
                label="Veterinarian"
              />
            </FormGroup>
            {errors.role && (
              <Typography color="error" variant="caption">
                {errors.role}
              </Typography>
            )}
          </Grid>
        </Grid>
      


      <Grid item xs={12}>
  {error && (
    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
      {error}
    </Alert>
  )}
        </Grid>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ color: colors.primary[400] }} to="/signin">
              <h3>Already have an account? Sign in</h3>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
}
