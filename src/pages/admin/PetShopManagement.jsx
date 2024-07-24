import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import PetAccessoryCard from "../../components/PetAccessoryCard";
import SearchBar from "../../components/SearchBar";
import { products } from "../../common/configuration/constants/Products";
import UpdateProductModal from "../../components/model/UpdateProductModal";
import DeleteConfirmationModal from "../../components/model/DeleteConfirmationModal";
import AddProductModal from "../../components/model/AddProductModal";
import AddButtonCard from "../../components/AddButtonCard";

function PetShopManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [productList, setProductList] = useState(products);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    setProductList(productList.filter(product => product.id !== id));
    setDeleteModalOpen(false);
  };

  const handleUpdate = (updatedProduct) => {
    setProductList(productList.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const handleAdd = (newProduct) => {
    setProductList([...productList, { ...newProduct, id: productList.length + 1 }]);
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const filteredAccessories = productList.filter(prod =>
    prod.name.toString().includes(searchQuery)
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pet Shop Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage Accessory Information
        </Typography>
        <SearchBar placeholder="Search Accessories By ID" value={searchQuery} onChange={handleSearchChange} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <AddButtonCard onAdd={() => setAddModalOpen(true)} />
        {filteredAccessories.map((product) => (
          <PetAccessoryCard
            key={product.id}
            product={product}
            onDelete={() => handleDeleteClick(product)}
            onUpdate={() => handleUpdateClick(product)}
          />
        ))}
      </Box>

      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          open={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          onSave={handleUpdate}
        />
      )}

      {selectedProduct && (
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDelete(selectedProduct.id)}
        />
      )}

      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </Container>
  );
}

export default PetShopManagement;
