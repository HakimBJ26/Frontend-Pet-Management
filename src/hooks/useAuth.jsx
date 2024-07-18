import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  return { currentUser, setCurrentUser, isLoading, setIsLoading };
};

export default useAuth;
