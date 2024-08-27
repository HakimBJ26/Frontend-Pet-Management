import React, { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import petDataService from "../../service/PetDataService";

const AddActivityModal = ({ open, handleClose, onAddActivity }) => {
  const [activityData, setActivityData] = useState({
    name: "",
    duration: 0,
    frequency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const today = new Date();
    const day = today.toISOString().split('T')[0];

    const activityWithDate = {
      ...activityData,
      day: day,
    };

    try {
      await petDataService.addActivityProposition(activityWithDate);
      onAddActivity(activityWithDate); 
      handleClose(); 
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 2, backgroundColor: "white", margin: "10% auto", maxWidth: 500 }}>
        <h2>Add New Activity</h2>
        <TextField
          label="Name"
          name="name"
          value={activityData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (minutes)"
          name="duration"
          value={activityData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Frequency"
          name="frequency"
          value={activityData.frequency}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Activity
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddActivityModal;
