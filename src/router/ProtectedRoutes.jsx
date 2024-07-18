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
  USER_MANAGEMENT_PATH, 
  PET_PROFILE,
  USER_PROFILE,
  PET_SHOP_MANAGEMENET_PATH
} from '../common/configuration/constants/Paths';
import PetProfile from "../pages/PetProfile";
import UserProfile from "../pages/UserProfile";
import PetShopManagement from '../pages/admin/PetShopManagement';

const ProtectedRoutes = () => (
  <Routes>
    <Route
      path={`${ADMIN_DASH_PATH}/*`}
      element={
        <ProtectedRoute roles={[ROLE_ADMIN]}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path={USER_MANAGEMENT_PATH} element={<UserManagement />} />
            <Route path={PET_SHOP_MANAGEMENET_PATH} element={<PetShopManagement />} />
          </Routes>
        </ProtectedRoute>
      }
    />

    <Route
      path={`${CLIENT_DASH_PATH}/*`}
      element={
        <ProtectedRoute roles={[ROLE_CLIENT]}>
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path={USER_PROFILE} element={<UserProfile />} />
            <Route path={PET_PROFILE} element={<PetProfile />} />
          </Routes>
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

    <Route path={SIGN_IN_PATH} element={<SignIn />} />
    <Route path={SIGN_UP_PATH} element={<SignUp />} />
  </Routes>
);

export default ProtectedRoutes;
