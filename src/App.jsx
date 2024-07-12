import React, { useEffect } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoutes from './router/ProtectedRoutes';
import { getAuthInfo } from './utils/authCred';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from './common/configuration/constants/UserRole';

function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const { token, role } = getAuthInfo();
    if (location.pathname === '/signup') {
      return;
    }
    if (token && role) {
      switch (role) {
        case ROLE_ADMIN:
          navigate('/dashboard-admin');
          break;
        case ROLE_CLIENT:
          navigate('/dashboard-client');
          break;
        case ROLE_VETO:
          navigate('/dashboard-veterinarian');
          break;
        default:
          navigate('/signin');
          break;
      }
    } else {
      navigate('/signin');
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
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
