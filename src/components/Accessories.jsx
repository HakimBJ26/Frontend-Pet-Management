import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, LinearProgress } from '@mui/material';
import PetShopService from '../service/PetShopService';
import '../styles/Accessories.css';
import { ACCESSORIES_CATEGORIES } from '../common/configuration/constants/CategoriesToSearch';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/cartStorage';

const Accessories = ({ selectedCategory, searchQuery }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId= localStorage.getItem('id')

  useEffect(() => {
    const fetchAccessories = async () => {
      setLoading(true);
      try {
        const response = await PetShopService.getProductByName(searchQuery);
        setAccessories(response);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, "1000");
      
     
      }
    };

    if (selectedCategory === ACCESSORIES_CATEGORIES) {
      fetchAccessories();
    }
  }, [selectedCategory, searchQuery]);

  const handleAddToCart=(product)=>{
    let cart = getCartFromLocalStorage(userId);
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
      cart[productIndex].nb += 1;
    } else {
      cart = [...cart, { ...product, nb: 1 }];
    }

    saveCartToLocalStorage(userId, cart);
  }

  if (selectedCategory !== ACCESSORIES_CATEGORIES) return null;

  return (
    <Box className="boxScrollClass">
      {loading && <LinearProgress />}
      <Box sx={{ display: 'inline-flex', flexDirection: 'row' }}>
        {accessories.map((item) => (
          <Card key={item.id} className="cardClass">
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.price} TND
              </Typography>
              <Button variant="contained" color="success" fullWidth onClick={()=>{
                handleAddToCart(item);
              }}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
        {accessories.length === 0 && !loading && <Typography variant='h6'>No results found!</Typography>}
      </Box>
    </Box>
  );
};

export default Accessories;
