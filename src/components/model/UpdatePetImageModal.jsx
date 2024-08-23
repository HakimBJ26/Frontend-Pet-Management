import { useState } from 'react';
import { Box, Button, CircularProgress, Modal } from '@mui/material';
import ImageUploader from '../global/ImageUploader';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import PetService from '../../service/PetService';
import UserService from '../../service/UserService';

const UpdateImageModal = ({ open, onClose, id ,folder }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setLoading(true);
    const storageRef = ref(storage, `${folder}_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Upload error:', error);
        setLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          if(folder==='user'){
            await UserService.updateUserImage(id, downloadURL);
          }else{
            await PetService.updatePetImage(id, downloadURL);
          }
          setLoading(false);
          onClose(); 
        } catch (error) {
          console.error('Error updating image:', error);
          setLoading(false);
        }
      }
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="custom-box-upload-modal" sx={{ backgroundColor: 'white', padding: '16px', width: '300px', margin: 'auto', mt: 10 }}>
        <ImageUploader onImageChange={handleImageChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleImageUpload}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Image'}
        </Button>
        <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateImageModal;
