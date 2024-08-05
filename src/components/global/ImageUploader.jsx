import { Box, TextField } from '@mui/material';

const ImageUploader = ({ onImageChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <TextField
        type="file"
        onChange={onImageChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ImageUploader;
