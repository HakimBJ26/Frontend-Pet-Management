import  { useState } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import UserService from '../service/UserService';
import { getAuthInfo } from '../utils/authCred';
import useToast from '../hooks/useToast';
import { ERROR_UPDATE_TOAST, SUCCESS_UPDATE_TOAST } from '../common/configuration/constants/ToastConfig';


function UserInfo({ user }) {
  const [data, setData] = useState(user);
  const {showToast}= useToast()
  const handleUpdate = async() => {
  


    try {
      const token = getAuthInfo().token
        await  UserService.updateUser(data.id, {
            name: data.name,
            email: data.email,
            role: data.role,
          },token );
          showToast(SUCCESS_UPDATE_TOAST)
       
      } catch (error) {
        showToast(ERROR_UPDATE_TOAST)
        console.error('Error Updating user:', error);
      }
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

    </Paper>
  );
}

export default UserInfo;
