import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import UserService from '../service/UserService';
import { getAuthInfo } from '../utils/authCred';
import CustomToast from './CustomToast';


function UserInfo({ user }) {
  const [data, setData] = useState(user);
  const [toastMessage, setToastMessage] = useState('');
  const [severity,setSeverity]= useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUpdate = async() => {
  



    try {
        await  UserService.updateUser(data.id, {
            name: data.name,
            email: data.email,
            role: data.role,
          }, getAuthInfo().token);
          setToastMessage("user Updated it successfully");
        setSnackbarOpen(true);
        setSeverity('success')
      } catch (error) {
        setSeverity('error')
        setToastMessage(error.response ? error.response.data : error.message);
        console.error('Error Updating user:', error);
      }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>User Information</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="User ID"
          value={data.id}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Role"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          variant="outlined"
          margin="normal"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
      <CustomToast
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={toastMessage}
        severity={severity}
      />

    </Paper>
  );
}

export default UserInfo;
