import React, { useEffect } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoutes from './router/ProtectedRoutes';
import { getAuthInfo } from './utils/authCred';
import { useNavigate } from 'react-router-dom';

function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate()
  useEffect(() => {
    const { token, role } = getAuthInfo();

    if (token && role) {
      switch (role) {
        case 'admin':
          navigate('/dashboard-admin');
          break;
        case 'client':
          navigate('/dashboard-client');
          break;
        case 'veterinarian':
          navigate('/dashboard-veterinarian');
          break;
        default:
          navigate('/signin');
          break;
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);

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
