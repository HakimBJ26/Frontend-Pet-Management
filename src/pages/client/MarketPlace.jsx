import React, { useEffect, useState } from 'react';
import { Grid, Box, Badge, IconButton, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from '../../components/ProductCard';
import PetShopService from '../../service/PetShopService';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../../utils/cartStorage';
import CartModal from '../../components/model/CartModel';

function MarketPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const [cartCount, setCartCount] = useState(0); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const theme = useTheme();
  const userId = localStorage.getItem('id'); 

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

  useEffect(() => {
    const cart = getCartFromLocalStorage(userId);
    setCartCount(cart.reduce((total, item) => total + item.nb, 0)); 
  }, [userId]);

  const handleAddToCart = (product) => {
    let cart = getCartFromLocalStorage(userId);
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
      cart[productIndex].nb += 1;
    } else {
      cart = [...cart, { ...product, nb: 1 }];
    }

    saveCartToLocalStorage(userId, cart);
    setCartCount(cart.reduce((total, item) => total + item.nb, 0));
  };

  return (
    <Box sx={{ marginTop: '50px', paddingBottom: '100px' }}>
      <h2 style={{ textAlign: 'center' }}>Marketplace</h2>
      <Grid container spacing={2} justifyContent="center">
        {productList.map((product) => (
          <Grid item xs={6} sm={3} key={product.id}>
            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
          </Grid>
        ))}
      </Grid>

      {/* Floating Cart Icon */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          backgroundColor: theme.palette.secondary.dark,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        color="inherit"
        onClick={() => setIsCartOpen(true)} 
      >
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

     
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} userId={userId} />
    </Box>
  );
}

export default MarketPlace;
