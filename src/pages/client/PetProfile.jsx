// PetProfile.js

import React, { useEffect, useState } from "react"; // Step 1: Imports
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PetService from "../../service/PetService"; // Adjust the path as needed

export default function PetProfile({ petId }) {
  // Step 2: Component Definition
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });

  const [open, setOpen] = useState(false); // Modal state
  const [newPetData, setNewPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });

  // Fetch pet data when the component mounts
  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await PetService.getPetById(petId);
        setPetData({
          name: response.name,
          breed: response.breed,
          age: response.age,
        });
      } catch (error) {
        console.error("Error fetching pet profile:", error);
      }
    };
    fetchPetProfile();
  }, [petId]); // Step 3: Fetch data

  // Step 4: Modal handling functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPetData({ name: "", breed: "", age: "" }); // Reset form fields
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetData({ ...newPetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PetService.addPet(newPetData); // Your API call
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Pet Profile
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 345, mx: "auto", mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Avatar
            src="/placeholder-pet.jpg" // Placeholder image
            sx={{
              width: 80,
              height: 80,
              border: "4px solid",
              borderColor: "background.default",
            }}
          >
            {petData.name.charAt(0)}
          </Avatar>
        </Box>
        <CardContent sx={{ p: 3 }}>
          {/* Display pet information */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Name
            </Typography>
            <Typography variant="body2">{petData.name}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Breed
            </Typography>
            <Typography variant="body2">{petData.breed}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Age
            </Typography>
            <Typography variant="body2">{petData.age}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button variant="outlined">Edit</Button>
            <Button variant="outlined">Add Photo</Button>
            <Button variant="outlined">Health Passport</Button>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen} // Open modal
                sx={{ mb: 2 }}
              >
                Add Pet
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Modal for Adding Pet */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Pet</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Pet Name"
              fullWidth
              variant="outlined"
              value={newPetData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="breed"
              label="Breed"
              fullWidth
              variant="outlined"
              value={newPetData.breed}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="age"
              label="Age"
              fullWidth
              variant="outlined"
              value={newPetData.age}
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Pet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
