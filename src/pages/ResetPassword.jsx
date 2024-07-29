import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import UserService from "../service/UserService";
import useToast from '../hooks/useToast';
import { SUCCESS_RESET_PASSWORD_TOAST, ERROR_INVALID_TOKEN_TOAST, ERROR_RESET_PASSWORD_TOAST } from '../common/configuration/constants/ToastConfig';
import { SIGN_IN_PATH } from "../common/configuration/constants/Paths";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const tokenVerified = useRef(false); 

  const verifyToken = useCallback(async (tokenParam) => {
    try {
      const res = await UserService.verifyResetPassToken(tokenParam);
      if (res.response && res.response.status === 400) {
        throw new Error("Invalid token");
      }
      setIsTokenValid(true);
    } catch (error) {
      setIsTokenValid(false);
      showToast(ERROR_INVALID_TOKEN_TOAST);
      setTimeout(() => {
        navigate(SIGN_IN_PATH);
      }, 1000);
    }
  }, [showToast, navigate]);

  useEffect(() => {
    if (!tokenVerified.current) {
      const tokenParam = searchParams.get('token');
      if (tokenParam) {
        setToken(tokenParam);
        verifyToken(tokenParam);
        tokenVerified.current = true; 
      }
    }
  }, [searchParams, verifyToken]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.password = password ? '' : 'Password is required';
    tempErrors.confirmPassword = confirmPassword ? '' : 'Confirm Password is required';
    tempErrors.match = password === confirmPassword ? '' : 'Passwords do not match';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validated = validate()
    if (validated) {
      try {
        await UserService.resetPassword(password, confirmPassword, token);
        showToast(SUCCESS_RESET_PASSWORD_TOAST);
        setTimeout(() => {
          navigate(SIGN_IN_PATH);
        }, 1000);
      } catch (error) {
        console.error('Password reset failed:', error);
        showToast(ERROR_RESET_PASSWORD_TOAST);
      }
    }
  };

  return (
    <Box sx={{ mt: 3, maxWidth: '400px', mx: 'auto' }}>
      <Typography component="h1" variant="h5" gutterBottom>
        Reset Password
      </Typography>
      {isTokenValid ? (
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword || !!errors.match}
                helperText={errors.confirmPassword || errors.match}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" color="error">
          Invalid or expired token. Please try requesting a new password reset.
        </Typography>
      )}
    </Box>
  );
}

export default ResetPassword;
