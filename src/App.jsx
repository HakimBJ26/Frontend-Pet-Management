import { useEffect } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoutes from './router/ProtectedRoutes';
import { getAuthInfo } from './utils/authCred';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from './common/configuration/constants/UserRole';
import { ADMIN_DASH_PATH, CLIENT_DASH_PATH, SIGN_IN_PATH, SIGN_UP_PATH, USER_MANAGEMENT_PATH, USER_PROFILE, VETO_DASH_PATH } from './common/configuration/constants/Paths';
import { Toaster } from 'sonner';

function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const { token, role } = getAuthInfo();
    if (location.pathname === SIGN_UP_PATH) {
      return;
    }
   if (token && role) {
      switch (role) {
        case ROLE_ADMIN:
          if (location.pathname === `${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`) return;
          navigate(ADMIN_DASH_PATH);
          break;
        case ROLE_CLIENT:
           if (location.pathname === `${CLIENT_DASH_PATH}${USER_PROFILE}`) 
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
