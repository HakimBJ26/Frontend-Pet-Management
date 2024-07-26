import { useTheme } from '@emotion/react';
import { Box, Modal, Typography, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  const theme = useTheme()
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, background:`${theme.palette.neutral.dark}`, borderRadius: 2, margin: 'auto', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this product?
        </Typography>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" sx={{ ml: 2 }} color='info' onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
