import { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Button, Grid, useTheme } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../../utils/cartStorage';

const CartModal = ({ open, onClose, userId }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage(userId));
  const theme = useTheme()

  useEffect(()=>{
    setCart(getCartFromLocalStorage(userId))
  },[open,userId])
  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart
      .map(item => {
        if (item.id === productId) {
          return { ...item, nb: item.nb + change };
        }
        return item;
      })
      .filter(item => item.nb > 0); 

    setCart(updatedCart);
    saveCartToLocalStorage(userId, updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.nb, 0);
  };

  return (
    <Modal open={open} onClose={onClose}>
   <Box className="custom-cart-box" sx={{ background :theme.palette.background.paper }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Cart</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {cart.map(product => (
            <Grid item xs={12} key={product.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleQuantityChange(product.id, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ marginX: 1 }}>{product.nb}</Typography>
                  <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1">${(product.price * product.nb).toFixed(2)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" sx={{ marginTop: 2 }}>Total: ${getTotalPrice().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Checkout</Button>
      </Box>
    </Modal>
  );
};

export default CartModal;
