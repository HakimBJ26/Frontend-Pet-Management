import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import UserService from '../service/UserService';

function AskToResetPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? (/\S+@\S+\.\S+/.test(email) ? '' : 'Email is not valid') : 'Email is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
        await UserService.sendResetPassMail(email)
      setEmailSent(true);
    }
  };

  return (
    <Box sx={{ mt: 3, maxWidth: '400px', mx: 'auto' }}>
      <Typography component="h1" variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Password Email
        </Button>
        {emailSent && (
          <Typography variant="body2"  sx={{ mt: 2 }}>
            A reset password email has been sent to {email}.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AskToResetPassword;
