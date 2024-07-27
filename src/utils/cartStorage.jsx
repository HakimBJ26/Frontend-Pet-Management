export const getCartFromLocalStorage = (userId) => {
    const cart = localStorage.getItem(`cart_${userId}`);
    return cart ? JSON.parse(cart) : [];
  };
  
  export const saveCartToLocalStorage = (userId, cart) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  };
  