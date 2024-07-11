// useAuth.js
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(user);
      } catch (e) {
        console.error("Invalid token:", e);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setIsLoading(false); 
  }, [setCurrentUser]);

  return { currentUser, isLoading };
};

export default useAuth;
