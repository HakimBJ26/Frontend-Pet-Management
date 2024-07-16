import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({placeHolder, value, onChange }) {
  return (
    <Paper
      component="form"
      sx={{ alignItems: 'center', display: 'flex', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolder}
        inputProps={{ 'aria-label': 'search user by ID' }}
        value={value}
        onChange={onChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
