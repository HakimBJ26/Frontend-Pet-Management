import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const role = localStorage.getItem('role');
    if (role) {
    
        const user = {}
       
          user.role = role;
      
        setCurrentUser(user);
    }else{
        setCurrentUser(null);
      }
     
    setIsLoading(false); 
  }, [setCurrentUser]);

  return { currentUser, isLoading };
};

export default useAuth;

