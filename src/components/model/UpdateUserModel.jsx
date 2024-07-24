import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import UserService from '../../service/UserService';
import { ERROR_UPDATE_TOAST, SUCCESS_UPDATE_TOAST } from '../../common/configuration/constants/ToastConfig';
import useToast from '../../hooks/useToast';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../../common/configuration/constants/UserRole'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function UpdateUserModal({ open, handleClose, user, onUserUpdate }) {
  const [data, setData] = useState(user);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setData((prevData) => ({ ...prevData, role: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await UserService.updateUser(data.id, {
        name: data.name,
        email: data.email,
        role: data.role,
        city: data.city,
        phone: data.phone
      });
      showToast(SUCCESS_UPDATE_TOAST);
      onUserUpdate(updatedUser);
      handleClose();
    } catch (error) {
      showToast(ERROR_UPDATE_TOAST);
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper elevation={3} sx={style}>
        <Typography variant="h6" gutterBottom>
          Update User Information
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={data.email || ''}
            InputProps={{
              readOnly: true,
            }}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={data.city || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup row name="role" value={data.role || ''} onChange={handleRoleChange}>
              <FormControlLabel value={ROLE_CLIENT} control={<Radio />} label="Client" />
              <FormControlLabel value={ROLE_ADMIN} control={<Radio />} label="Admin" />
              <FormControlLabel value={ROLE_VETO} control={<Radio />} label="Veterinarian" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Paper>
    </Modal>
  );
}

export default UpdateUserModal;
