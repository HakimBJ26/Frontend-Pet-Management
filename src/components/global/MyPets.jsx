import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import PetService from "../../service/PetService"; 
import { useAuth } from "../../context/AuthContext"; 

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await PetService.getPetsByOwnerEmail(user.email);
        setPets(fetchedPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    if (user && user.email) {
      fetchPets();
    }
  }, [user]);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        My Pets
      </Typography>
      {pets.map((pet) => (
        <Card key={pet.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{pet.name}</Typography>
            <Typography variant="subtitle1">Breed: {pet.breed}</Typography>
            <Typography variant="subtitle1">Age: {pet.age}</Typography>
          </CardContent>
        </Card>
      ))}
      {pets.length === 0 && <Typography>No pets found.</Typography>}
    </Box>
  );
};

export default MyPets;
