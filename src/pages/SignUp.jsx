import { useState } from 'react';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import StyledBox from '../components/StyledBox';
import { ROLE_CLIENT, ROLE_VETO } from '../common/configuration/constants/UserRole';
import CustomTextField from '../components/CustomTextField';
import { SIGN_UP_FIELDS } from '../common/configuration/constants/SignUpFieldsName';
import { SIGN_IN_PATH } from '../common/configuration/constants/Paths';
import { ERROR_SIGN_UP_TOAST, SUCCESS_SIGN_UP_TOAST } from '../common/configuration/constants/ToastConfig';
import useToast from '../hooks/useToast';

export default function SignUp() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    role: '',
    phone: '',
    countryCode: '+1', // Default country code
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
    tempErrors.email = formData.email
      ? /\S+@\S+\.\S+/.test(formData.email)
        ? ''
        : 'Email is not valid'
      : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.city = formData.city ? '' : 'City is required';
    tempErrors.role = formData.role ? '' : 'Role is required';
    tempErrors.phone = formData.phone ? '' : 'Phone number is required';
    tempErrors.countryCode = formData.countryCode ? '' : 'Country code is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validated = validate();
    if (validated) {
    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
    const { countryCode, ...submissionData } = formData;
    submissionData.phone = fullPhoneNumber;

      try {
        await UserService.register(submissionData);
        setTimeout(() => {
          navigate(SIGN_IN_PATH);
          showToast(SUCCESS_SIGN_UP_TOAST);
        }, 2000);
      } catch (error) {
        showToast(ERROR_SIGN_UP_TOAST);
        console.error('Error registering user:', error);
      }
    }
  };

  const fields = SIGN_UP_FIELDS.map((field) => ({
    ...field,
    value: formData[field.name],
    error: errors[field.name],
    helperText: errors[field.name],
  }));

  return (
    <StyledBox >
      <Typography variant="h1">PETAGORA</Typography>
      <Divider variant="middle" sx={{ mb: 3 }} />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PetsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, marginBottom:10 }}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={field.name === 'countryCode' || field.name === 'phone' ? 6 : 12} key={field.id}>
              <CustomTextField
                autoComplete={field.autoComplete}
                name={field.name}
                required
                fullWidth
                id={field.id}
                label={field.label}
                type={field.type}
                value={field.value}
                onChange={handleChange}
                error={!!field.error}
                helperText={field.helperText}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormGroup>
              <Typography variant="subtitle1">Select Role</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="role"
                    value={ROLE_CLIENT}
                    checked={formData.role === ROLE_CLIENT}
                    onChange={handleChange}
                  />
                }
                label="Client"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="role"
                    value={ROLE_VETO}
                    checked={formData.role === ROLE_VETO}
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ color: colors.primary[400] }} to={SIGN_IN_PATH}>
              <h3>Already have an account? Sign in</h3>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
}
