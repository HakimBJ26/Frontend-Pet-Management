// App.js
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext'; // Ensure you import AuthContextProvider
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import VetoDashboard from './pages/Dashboard/VetoDashboard';
import useAuth from './hooks/useAuth';

function App() {
  const [colorMode, theme] = useMode();

  const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!currentUser) {
      return <Navigate to='/signin' />;
    }

    return children;
  };

  return (
    <AuthContextProvider> {/* Ensure AuthContextProvider wraps your entire app */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/dashboard-admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/dashboard-client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
                <Route path="/dashboard-veterinarian" element={<ProtectedRoute><VetoDashboard /></ProtectedRoute>} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
