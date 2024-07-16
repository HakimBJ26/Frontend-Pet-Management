import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { SIGN_IN_PATH } from '../common/configuration/constants/Paths';

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to={SIGN_IN_PATH}/>;
  }

  if (roles && !roles.includes(currentUser.role)) {
   
    return <Navigate to={SIGN_IN_PATH} />;
  }

  return children;
};

export default ProtectedRoute;
