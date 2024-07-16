import { Box, Grid, Typography } from "@mui/material";
import PetAccessoryCard from "../../components/PetAccessoryCard";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

function PetShopManagement() {
    const [searchQuery,setSearchQuery]=useState('')

const products = [
    {
      id: 1,
      img: 'https://images.squarespace-cdn.com/content/v1/5c6467680cf57d95a64743db/1618328087580-2643I1AGBEXTYW4FJB25/jingle_ball_cat_toy.jpg?format=1000w', 
      name: 'Cat Toy',
      price: 9.99,
    },
    {
      id: 2,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXZXP1sPb8yIY7myqRr-Uv4E0qhK5rkZ-Sw&s', 
      name: 'Pet Leash',
      price: 15.99,
    },
    {
      id: 3,
      img: 'https://m.media-amazon.com/images/I/71HVr-TP6cL._AC_UF1000,1000_QL80_.jpg', 
      name: 'Pet Bed',
      price: 45.99,
    },
    {
      id: 4,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVJ_Kx05yJEFrPi-GdAdFrKNz2n8d8q0WPg&s', 
      name: 'Pet Toy',
      price: 12.99,
    },
    {
      id: 5,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5zHS51GmcaukO8M8rLEyYvn3IMUdYByA2A&s', 
      name: 'Pet Bowl',
      price: 7.99,
    },
  ];

  const handleDelete = (id) => {
    console.log(`Delete product with id: ${id}`);
  };
  
  const handleUpdate = (id, updatedProduct) => {
    console.log(`Update product with id: ${id}`, updatedProduct);
  };


  const handleSearchChange = (event) =>{
    setSearchQuery(event.target.value) ;
  }

  const filteredAccessiors = products.filter(prod =>
    prod.id.toString().includes(searchQuery)
  );

  return (
   
 <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Pet Shop Management
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage Accessiors informations
          </Typography>
          <SearchBar placeHolder="Search  Accessoirss By ID" value={searchQuery} onChange={handleSearchChange} />
        </Box>
        <Grid container spacing={3} margin={2} justifyContent="center">
      {filteredAccessiors.map((product) => (
      <PetAccessoryCard key={product.id} product={product} onDelete={handleDelete} onUpdate={handleUpdate} />
    ))}
  </Grid>
  </Box>
  )
}

export default PetShopManagement