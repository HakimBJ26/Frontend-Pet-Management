import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';

const UpdateProductModal = ({ product, open, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, margin: 'auto', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Update Product
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
