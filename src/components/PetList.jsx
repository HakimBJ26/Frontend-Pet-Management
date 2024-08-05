import React, { useEffect, useState } from "react";
import PetService from "../../service/PetService";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petData = await PetService.getAllPets();
        setPets(petData);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []); 

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        My Pets
      </Typography>
      {pets.length > 0 ? (
        pets.map((pet) => (
          <Card key={pet.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{pet.name}</Typography>
              <Typography variant="body2">Breed: {pet.breed}</Typography>
              <Typography variant="body2">Age: {pet.age}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No pets found.</Typography>
      )}
    </Box>
  );
}
