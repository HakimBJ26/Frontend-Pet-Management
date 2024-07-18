import { useEffect } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoutes from './router/ProtectedRoutes';
import { getAuthInfo, shouldShowSideBar, shouldShowTopBar } from './utils/authCred';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from './components/global/SideBar';
import TopBar from './components/global/Topbar';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from './common/configuration/constants/UserRole';
import { Toaster } from 'sonner';
import {
  CLIENT_DASH_PATH, VETO_DASH_PATH, SIGN_IN_PATH, SIGN_UP_PATH,
  ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH, COMMUNITY_PATH,
  DEFINE_SAFE_ZONE_PATH, GPS_LOCATOR_PATH,
  HEALTH_MONITOR_PATH, HEALTH_PASSPORT_PATH, MARKET_PLACE_PATH,
  SET_ACTIVITY_GOALS_PATH,
  ADMIN_DASH_PATH, USER_MANAGEMENT_PATH,
  VETO_NOTIFICATIONS_PATH,
  VETO_UPDATE_NOTES_PATH,
  VETO_UPDATE_TREATMENT_PATH,
  USER_PROFILE,
  PET_PROFILE,
  PET_SHOP_MANAGEMENT
} from './common/configuration/constants/Paths';

function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const {role } = getAuthInfo();
    
    if (location.pathname === SIGN_UP_PATH) {
      return;
    }
    if (role) {
      switch (role) {
        case ROLE_ADMIN: {
          const adminpaths = [
            USER_MANAGEMENT_PATH, PET_SHOP_MANAGEMENT
          ];
          if (adminpaths.some(path => location.pathname === `${ADMIN_DASH_PATH}${path}`)) {
            return;
          }
          navigate(`${ADMIN_DASH_PATH}`);
          break;
        }
        case ROLE_CLIENT: {
          const clientPaths = [
            GPS_LOCATOR_PATH, ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH,
            COMMUNITY_PATH, USER_PROFILE, DEFINE_SAFE_ZONE_PATH,
            HEALTH_MONITOR_PATH, HEALTH_PASSPORT_PATH, MARKET_PLACE_PATH,
            SET_ACTIVITY_GOALS_PATH, PET_PROFILE, USER_PROFILE, PET_PROFILE
          ];
          if (clientPaths.some(path => location.pathname === `${CLIENT_DASH_PATH}${path}`)) {
            return;
          }
          navigate(`${CLIENT_DASH_PATH}`);
          break;
        }
        case ROLE_VETO: {
          const vetoPaths = [
            VETO_NOTIFICATIONS_PATH, VETO_UPDATE_NOTES_PATH, VETO_UPDATE_TREATMENT_PATH
          ];
          if (vetoPaths.some(path => location.pathname === `${VETO_DASH_PATH}${path}`)) {
            return;
          }
          navigate(`${VETO_DASH_PATH}`);
          break;
        }
        default:
          navigate(SIGN_IN_PATH);
          break;
      }
    } else {
      navigate(SIGN_IN_PATH);
    }
  }, [navigate, location.pathname]);

  return (
    <AuthContextProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {shouldShowSideBar(location.pathname) && <SideBar />}
            {shouldShowTopBar(location.pathname) && <TopBar />}
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
