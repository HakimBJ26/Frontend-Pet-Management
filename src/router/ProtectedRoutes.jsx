import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import ClientDashboard from '../pages/Dashboard/ClientDashboard';
import VetoDashboard from '../pages/Dashboard/VetoDashboard';
import ProtectedRoute from './ProtectedRoute';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../common/configuration/constants/UserRole';
import UserManagement from '../pages/admin/UserManagement';
import { 
  SIGN_UP_PATH, 
  SIGN_IN_PATH, 
  ADMIN_DASH_PATH, 
  CLIENT_DASH_PATH, 
  VETO_DASH_PATH, 
  USER_MANAGEMENT_PATH 
} from '../common/configuration/constants/Paths';

const ProtectedRoutes = () => (
  <Routes>
    <Route 
      path={`${ADMIN_DASH_PATH}/*`}
      element={
        <ProtectedRoute roles={[ROLE_ADMIN]}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path={USER_MANAGEMENT_PATH} element={<UserManagement />} />
          </Routes>
        </ProtectedRoute>
      }
    />
    <Route 
      path={CLIENT_DASH_PATH} 
      element={
        <ProtectedRoute roles={[ROLE_CLIENT]}>
          <ClientDashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path={VETO_DASH_PATH} 
      element={
        <ProtectedRoute roles={[ROLE_VETO]}>
          <VetoDashboard />
        </ProtectedRoute>
      } 
    />
    <Route path={SIGN_IN_PATH} element={<SignIn />} />
    <Route path={SIGN_UP_PATH} element={<SignUp />} />
  </Routes>
);

export default ProtectedRoutes;
