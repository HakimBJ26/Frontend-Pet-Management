import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, TextField, Button, CircularProgress } from '@mui/material';
import ImageUploader from '../global/ImageUploader';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const AddProductModal = ({ open, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setNewProduct({ name: '', price: '', imageUrl: '' });
      setImage(null);
      setLoading(false);
      setErrors({});
    }
  }, [open]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateFields = () => {
    const errors = {};
    if (!newProduct.name.trim()) errors.name = "Name is required";
    if (!newProduct.price) errors.price = "Price is required";
    return errors;
  };

  const handleAdd = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (image) {
      setLoading(true);
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload error:', error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const updatedProduct = { ...newProduct, imageUrl: downloadURL };
          onAdd(updatedProduct);
          setLoading(false);
          onClose();
        }
      );
    } else {
      onAdd(newProduct);
      onClose();
    }
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
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
        />
        <ImageUploader onImageChange={handleImageChange} />
     
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Product'}
        </Button>
        <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
