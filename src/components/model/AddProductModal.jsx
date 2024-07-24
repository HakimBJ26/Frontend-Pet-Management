import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const AddProductModal = ({ open, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setNewProduct({ ...newProduct, imageUrl: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAdd = () => {
    onAdd(newProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, margin: 'auto', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {image && <Box component="img" src={newProduct.imageUrl} alt="Product" sx={{ mt: 2, width: '100%', height: 'auto' }} />}
        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: 2 }}>
          Add Product
        </Button>
        <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
