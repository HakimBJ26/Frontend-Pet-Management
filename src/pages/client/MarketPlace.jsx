import { useEffect, useState } from 'react';
import { Grid, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from '../../components/ProductCard';
import PetShopService from '../../service/PetShopService';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../../utils/cartStorage';
import CartModal from '../../components/model/CartModel';
import SearchBar from '../../components/SearchBar';
import FloatingCartIcon from '../../components/styledComponents/FloatingCartIcon';

function MarketPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [cartCount, setCartCount] = useState(0); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
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
  }, [userId,isCartOpen,cartCount]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAccessories = productList.filter(prod =>
    prod.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

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
    <Box sx={{ marginTop: '50px', padding: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Marketplace</h2>
      <Box sx={{marginBottom:'20px'}}>
      <SearchBar placeholder="Search Accessories By Name" value={searchQuery} onChange={handleSearchChange} />
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {filteredAccessories.map((product) => (
          <Grid item xs={6} sm={3} key={product.id}>
            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
          </Grid>
        ))}
      </Grid>

    
      <FloatingCartIcon color="inherit" onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </FloatingCartIcon>

     
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} userId={userId} />
    </Box>
  );
}

export default MarketPlace;
