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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PetService from "../../service/PetService"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate

// List of domestic animal breeds
const breedOptions = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Dachshund",
  "Boxer",
  "Siamese Cat",
  "Persian Cat",
  "Maine Coon",
  "Bengal Cat",
  "Sphynx Cat",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "French Bulldog",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Ferret",
  "Parrot",
  "Canary",
  "Other", // Add "Other" option
  // Add more species or breeds as needed
];

export default function PetProfile({ petId }) {
  // Step 2: Component Definition
  const [petData, setPetData] = useState([]);

  const [open, setOpen] = useState(false); // Modal state
  const [newPetData, setNewPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });
  const [isOtherBreed, setIsOtherBreed] = useState(false); // State to handle "Other" breed
  const [otherBreed, setOtherBreed] = useState(""); // State to handle the value of "Other" breed

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch pet data when the component mounts
  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await PetService.getPets();
        console.log(response);
        setPetData(response);
      } catch (error) {
        console.error("Error fetching pet profile:", error);
      }
    };
    fetchPetProfile();
  }, []);

  // Step 4: Modal handling functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPetData({ name: "", breed: "", age: "" }); // Reset form fields
    setIsOtherBreed(false); // Reset "Other" breed state
    setOtherBreed(""); // Reset other breed value
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetData({ ...newPetData, [name]: value });
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setNewPetData({ ...newPetData, age: value });
  };

  const handleBreedChange = (e) => {
    const value = e.target.value;
    setNewPetData({ ...newPetData, breed: value });
    setIsOtherBreed(value === "Other"); // Show/hide other breed input based on selection
  };

  const handleOtherBreedChange = (e) => {
    const value = e.target.value;
    setOtherBreed(value);
    setNewPetData({ ...newPetData, breed: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!newPetData.name || !newPetData.breed || !newPetData.age) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await PetService.addPet(newPetData);

      // Update petData with the new pet data
      setPetData([...petData, newPetData]);

      handleClose(); // Close the modal
      navigate(-1); // Go back to the previous page
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

      {/* Add Pet Card */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Card sx={{ maxWidth: 345, mx: "auto", mt: 10 }}>
          <CardContent sx={{ p: 3 }}>
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
          </CardContent>
        </Card>
      </Box>

      {/* Pet Cards */}
      {petData.map((p) => (
        <Card key={p.id} sx={{ maxWidth: 345, mx: "auto", mt: 10 }}>
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
              {p.name}
            </Avatar>
          </Box>
          <CardContent sx={{ p: 3 }}>
            {/* Display pet information */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Name
              </Typography>
              <Typography variant="body2">{p.name}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Breed
              </Typography>
              <Typography variant="body2">{p.breed}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Age
              </Typography>
              <Typography variant="body2">{p.age}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="outlined">Edit</Button>
              <Button variant="outlined">Add Photo</Button>
              <Button variant="outlined">Health Passport</Button>
            </Box>
          </CardContent>
        </Card>
      ))}

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
            <FormControl fullWidth margin="dense">
              <InputLabel id="breed-select-label">Breed</InputLabel>
              <Select
                labelId="breed-select-label"
                name="breed"
                value={newPetData.breed}
                onChange={handleBreedChange}
                label="Breed"
              >
                {breedOptions.map((breed, index) => (
                  <MenuItem key={index} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isOtherBreed && (
              <TextField
                margin="dense"
                name="otherBreed"
                label="Other Breed"
                fullWidth
                variant="outlined"
                value={otherBreed}
                onChange={handleOtherBreedChange}
              />
            )}
            <FormControl fullWidth margin="dense">
              <InputLabel id="age-select-label">Age</InputLabel>
              <Select
                labelId="age-select-label"
                name="age"
                value={newPetData.age}
                onChange={handleAgeChange}
                label="Age"
              >
                {Array.from({ length: 71 }, (_, index) => (
                  <MenuItem key={index} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
