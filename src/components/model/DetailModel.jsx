import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Card,
  CardMedia,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useTheme } from '@emotion/react';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled(Box)`
background-color: ${({ theme }) => theme.palette.secondary.main};
padding: 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  outline: none;
`;

const ImageCard = styled(Card)`
  margin-bottom: 16px;
`;

const DetailModal = ({ open, onClose, product, onUpdate, onDelete }) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [image, setImage] = useState(product?.imageUrl || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleteModelConfir, setDeleteModelConfir] = useState(false);
  const theme = useTheme();


  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price || '');
    setImage(product?.imageUrl || '');
    setErrors({});
  }, [product]);

  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!selectedFile) return;

    setUploadingImage(true);

    const storageRef = ref(storage, `products/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Upload error:', error);
        alert('Error uploading image');
        setUploadingImage(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setUploadingImage(false);
          handleUpdate(downloadURL);
        });
      }
    );
  };

  const validateFields = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    return errors;
  };

  const handleUpdate = (uploadedImageUrl) => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedProduct = {
      ...product,
      name,
      price,
      imageUrl: uploadedImageUrl || image,
    };
    onUpdate(updatedProduct);
  };

  const handleUpdateClick = () => {
    if (selectedFile) {
      handleImageUpload();
    } else {
      handleUpdate();
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
   <ContentBox theme={theme}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Update Product</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <ImageCard>
          <CardMedia
            component="img"
            alt={product?.name}
            height="200"
            image={image}
          />
        </ImageCard>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          type="file"
          onChange={handleImageChange}
          sx={{ mb: 2 }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateClick}
            disabled={uploadingImage}
          >
            {uploadingImage ? 'Uploading...' : 'Update'}
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteModelConfir(true)}>
            Delete
          </Button>
        </Box>
        <DeleteConfirmationModal
          open={deleteModelConfir}
          onConfirm={() => {
            onDelete()
            setDeleteModelConfir(false);
          }}
          onClose={() => setDeleteModelConfir(false)}
        />
      </ContentBox>
    </StyledModal>
  );
};

export default DetailModal;
