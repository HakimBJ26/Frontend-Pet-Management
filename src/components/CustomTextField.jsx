import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ id, name, label, type = 'text', autoComplete, value, onChange, error, helperText }) => (
  <TextField
    required
    fullWidth
    id={id}
    name={name}
    label={label}
    type={type}
    autoComplete={autoComplete}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={helperText}
  />
);

export default CustomTextField;
