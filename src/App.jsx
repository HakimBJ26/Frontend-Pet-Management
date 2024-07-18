import {  useEffect } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoutes from './router/ProtectedRoutes';
import { getAuthInfo } from './utils/authCred';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from './common/configuration/constants/UserRole';
import { ADMIN_DASH_PATH, CLIENT_DASH_PATH, PET_PROFILE, PET_SHOP_MANAGEMENET_PATH, SIGN_IN_PATH, SIGN_UP_PATH, USER_MANAGEMENT_PATH, USER_PROFILE, VETO_DASH_PATH } from './common/configuration/constants/Paths';
import { Toaster } from 'sonner';
import {  useCookies } from 'react-cookie';
import UserService from './service/UserService';



function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate()
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies('jwt');


console.log(cookies)
useEffect(() => {
  const updateUserProfile = async () => {
    try {
      // Update the user profile
      const response = await UserService.updateUser({
        name: 'aymen',
        email: 'aymen@gmail.com',
      });

      console.log('User profile updated:', response);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  updateUserProfile();
}, []);



  useEffect(() => {
    const { token, role } ={"token":"44", "role":"admin"};
    if (location.pathname === SIGN_UP_PATH) {
      return;
    }
   if (token && role) {
      switch (role) {
        case ROLE_ADMIN:
          if (location.pathname === `${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`) return;
          if (location.pathname === `${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENET_PATH}`) return;
          navigate(ADMIN_DASH_PATH);
          break;
        case ROLE_CLIENT:
           if (location.pathname === `${CLIENT_DASH_PATH}${USER_PROFILE}`) 
      return;
      if (location.pathname === `${CLIENT_DASH_PATH}${PET_PROFILE}`) 
      return;
          navigate(CLIENT_DASH_PATH);
          break;
        case ROLE_VETO:
          navigate(VETO_DASH_PATH);
          break;
        default:
          navigate(SIGN_IN_PATH);
          break;
      }
    } else {
      navigate(SIGN_IN_PATH);
    }
  }, [navigate,location.pathname]);

  return (
    <AuthContextProvider>
    
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <ProtectedRoutes />
              <Toaster expand visibleToasts={9} />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  
    </AuthContextProvider>
  );
}

export default App;
