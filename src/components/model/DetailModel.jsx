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
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'; 

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled(Box)`
  background-color: white;
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
  const [image, setImage] = useState(product?.image || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price || '');
    setImage(product?.image || '');
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
      (snapshot) => {
      },
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

  const handleUpdate = (uploadedImageUrl) => {
    const updatedProduct = {
      ...product,
      name,
      price,
      image: uploadedImageUrl || image, 
    };
    console.log(updatedProduct.image)
    console.log(JSON.stringify(updatedProduct, null, 2));
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
      <ContentBox>
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
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
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
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </ContentBox>
    </StyledModal>
  );
};

export default DetailModal;
