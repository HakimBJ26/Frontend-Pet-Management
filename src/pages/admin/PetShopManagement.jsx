import React, { useEffect, useState } from 'react';
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
import SearchBar from "../../components/SearchBar";
import { products } from "../../common/configuration/constants/Products";
import AddProductModal from "../../components/model/AddProductModal";
import AddButtonCard from "../../components/AddButtonCard";
import DetailModal from "../../components/model/DetailModel";
import PetShopService from '../../service/PetShopService';
import useToast from '../../hooks/useToast';
import { 
  SUCCESS_ADD_TOAST,
  ERROR_ADD_TOAST,
  SUCCESS_UPDATE_PRODUCT_TOAST,
  ERROR_UPDATE_PRODUCT_TOAST,
  SUCCESS_DELETE_TOAST,
  ERROR_DELETE_TOAST,
} from '../../common/configuration/constants/ToastConfig';






function PetShopManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [productList, setProductList] = useState(products);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await PetShopService.getAllProducts();
        setProductList(res);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await PetShopService.deleteProduct(id);
      setProductList(productList.filter(product => product.id !== id));
      showToast(SUCCESS_DELETE_TOAST);
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast(ERROR_DELETE_TOAST);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await PetShopService.updateProduct(updatedProduct);
      const updatedProducts = await PetShopService.getAllProducts();
      setProductList(updatedProducts);
      showToast(SUCCESS_UPDATE_PRODUCT_TOAST);
    } catch (error) {
      console.error('Error updating product:', error);
      showToast(ERROR_UPDATE_PRODUCT_TOAST);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      await PetShopService.addProduct(newProduct);
      const updatedProducts = await PetShopService.getAllProducts();
      setProductList(updatedProducts);
      setAddModalOpen(false);
      showToast(SUCCESS_ADD_TOAST);
    } catch (error) {
      console.error('Error adding product:', error);
      showToast(ERROR_ADD_TOAST);
    }
  };

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const filteredAccessories = productList.filter(prod =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{  marginTop: '40px',
      width: '60%'}}>
      <Box className='header-box-pet-management'>
        <Typography variant="h4" component="h1" gutterBottom>
          Pet Shop Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage Accessory Information
        </Typography>
        <SearchBar placeholder="Search Accessories By Name" value={searchQuery} onChange={handleSearchChange} />
      </Box>
      <Box sx={{  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px'}}>
        <AddButtonCard onAdd={() => setAddModalOpen(true)} />
      </Box>
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
          onUpdate={(selectedProduct) => {
            handleUpdate(selectedProduct);
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
    </Container>
  );
}

export default PetShopManagement;
