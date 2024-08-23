import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

const UpdatePetGoalDialog = ({ open, onClose, petGoalData }) => {
  const [formData, setFormData] = useState({
    currentWeight: petGoalData.currentWeight,
    healthGoal: petGoalData.healthGoal,
    dailyExerciseRoutine: petGoalData.dailyExerciseRoutine,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Implement the update logic here
    // For example, send formData to the server and handle response
    console.log('Updated Pet Goal Data:', formData);
    onClose(); // Close the dialog after updating
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Pet Goal</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Current Weight"
            name="currentWeight"
            type="number"
            value={formData.currentWeight}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Health Goal"
            name="healthGoal"
            value={formData.healthGoal}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Daily Exercise Routine"
            name="dailyExerciseRoutine"
            value={formData.dailyExerciseRoutine}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePetGoalDialog;
