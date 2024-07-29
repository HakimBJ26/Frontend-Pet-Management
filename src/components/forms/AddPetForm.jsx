import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import PetService from "../../service/PetService";

export default function AddPetForm() {
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PetService.addPet(petData);
      console.log("Pet added:", response);
      setPetData({ name: "", breed: "", age: "" }); // Clear form after submission
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Add New Pet
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            value={petData.age}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Pet
          </Button>
        </Box>
      </form>
    </Box>
  );
}
