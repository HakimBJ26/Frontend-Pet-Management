import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import ChatService from '../../service/ChatService';
import useToast from '../../hooks/useToast';
import { ERROR_GROUP_CHAT_CREATED_TOAST, SUCCESS_GROUP_CHAT_CREATED_TOAST } from '../../common/configuration/constants/ToastConfig';
import '../../styles/GroupChatModal.css'
function CreateGroupModal({ open, handleClose, onGroupCreated }) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const userId = parseInt(localStorage.getItem('id'), 10);
  const { showToast } = useToast();


  const handleCreateGroup = async () => {
    if (groupName.trim() && groupDescription.trim()) {
      const groupData = {
        name: groupName,
        description: groupDescription,
        createdById: userId,
        memberIds: [userId],
      };

      try {
        await ChatService.createGroupChat(groupData);
        onGroupCreated();
        handleClose();
        showToast(SUCCESS_GROUP_CHAT_CREATED_TOAST)
      } catch (error) {
        console.error("Error creating group chat:", error);
        showToast(ERROR_GROUP_CHAT_CREATED_TOAST)

      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box  className="create-group-modal">
        <Typography variant="h6" component="h2" gutterBottom>
          Create New Group
        </Typography>
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
}

export default CreateGroupModal;
