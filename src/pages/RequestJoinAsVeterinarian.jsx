import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import UserService from '../service/UserService';
import { StyledBox } from '../components/StyledBox';
import CustomTextField from '../components/CustomTextField';
import { SIGN_UP_FIELDS } from '../common/configuration/constants/SignUpFieldsName';
import { SUCCESS_REQUEST_JOIN_TOAST, ERROR_REQUEST_JOIN_TOAST } from '../common/configuration/constants/ToastConfig';
import useToast from '../hooks/useToast';
import { ROLE_VETO } from '../common/configuration/constants/UserRole';
import Loader from '../Loading/Loader';

export default function RequestJoinAsVeterinarian() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: `${ROLE_VETO}`, 
    countryCode: '+1',
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
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = formData.email
      ? /\S+@\S+\.\S+/.test(formData.email)
        ? ''
        : 'Email is not valid'
      : 'Email is required';
    tempErrors.phone = formData.phone ? '' : 'Phone number is required';
    tempErrors.city = formData.city ? '' : 'City is required';
    tempErrors.countryCode = formData.countryCode ? '' : 'Country code is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validated = validate();
    if (validated) {
      setIsLoading(true);
      const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
      const { countryCode, ...submissionData } = formData;
      submissionData.phone = fullPhoneNumber; 
      submissionData.role = 'VETERINARIAN';  

      try {
        await UserService.register(submissionData); 
        showToast(SUCCESS_REQUEST_JOIN_TOAST);
        navigate('/'); 
      } catch (error) {
        showToast(ERROR_REQUEST_JOIN_TOAST);
        console.error('Error requesting to join as veterinarian:', error);
      }finally{
        setIsLoading(false);
      }
    }
  };

  const fields = SIGN_UP_FIELDS.map((field) => ({
    ...field,
    value: formData[field.name],
    error: errors[field.name],
    helperText: errors[field.name],
  })).filter(field => field.name !== 'message');

  return (
    <>
      <StyledBox>
        <Typography variant="h1">PETAGORA</Typography>
        <Divider variant="middle" sx={{ mb: 3 }} />
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PetsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Request to Join as a Veterinarian
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, marginBottom: 10 }}>
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              </Grid>
            ))}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <Loader size={24} color="#ffffff" /> : <span> Submit Request </span>}
          </Button>
        </Box>
      </StyledBox>
    </>
  );
}
