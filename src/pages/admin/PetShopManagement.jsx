import { Box, Grid, Typography } from "@mui/material";
import PetAccessoryCard from "../../components/PetAccessoryCard";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import { products } from "../../common/configuration/constants/Products";
import StyledBox from "../../components/StyledBox";

function PetShopManagement() {
    const [searchQuery,setSearchQuery]=useState('')



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
   
 <StyledBox>
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
  </StyledBox>
  )
}

export default PetShopManagement
