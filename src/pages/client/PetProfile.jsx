import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import PetService from "../../service/PetService"; // Import your PetService

export default function PetProfile({ petId }) {
  // Accept petId as a prop
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });

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
  }, [petId]); // Fetch pet data when petId changes

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
            src="/placeholder-pet.jpg" // Placeholder image for pets
            sx={{
              width: 80,
              height: 80,
              border: "4px solid",
              borderColor: "background.default",
            }}
          >
            {petData.name.charAt(0)} {/* Display first letter of pet's name */}
          </Avatar>
        </Box>
        <CardContent sx={{ p: 3 }}>
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
