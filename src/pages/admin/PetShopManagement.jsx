import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import styled from '@emotion/styled';
import SearchBar from "../../components/SearchBar";
import { products } from "../../common/configuration/constants/Products";
import AddProductModal from "../../components/model/AddProductModal";
import AddButtonCard from "../../components/AddButtonCard";
import DetailModal from "../../components/model/DetailModel";


const PageContainer = styled(Container)`
  margin-top: 16px;
  width: 60%;
`;

const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

function PetShopManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [productList, setProductList] = useState(products);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    setProductList(productList.filter(product => product.id !== id));
  };

  const handleUpdate = (updatedProduct) => {
    setProductList(productList.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const handleAdd = (newProduct) => {
    setProductList([...productList, { ...newProduct, id: productList.length + 1 }]);
  };

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const filteredAccessories = productList.filter(prod =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <HeaderBox>
        <Typography variant="h4" component="h1" gutterBottom>
          Pet Shop Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage Accessory Information
        </Typography>
        <SearchBar placeholder="Search Accessories By Name" value={searchQuery} onChange={handleSearchChange} />
      </HeaderBox>
      <CenteredBox>
        <AddButtonCard onAdd={() => setAddModalOpen(true)} />
      </CenteredBox>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccessories.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDetailClick(product)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProduct && (
        <DetailModal
          open={isDetailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          product={selectedProduct}
          onUpdate={(updatedProduct) => {
            handleUpdate(updatedProduct);
            setDetailModalOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedProduct.id);
            setDetailModalOpen(false);
          }}
        />
      )}

      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </PageContainer>
  );
}

export default PetShopManagement;
