import {  useEffect, useState } from 'react'
import './App.css'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import ProtectedRoutes from './router/ProtectedRoutes'
import { getAuthInfo, shouldShowSideBar, shouldShowTopBar } from './utils/authCred'
import { useLocation, useNavigate } from 'react-router-dom'
import SideBar from './components/global/SideBar'
import TopBar from './components/global/Topbar'
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from './common/configuration/constants/UserRole'
import { Toaster } from 'sonner'
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
  PET_SHOP_MANAGEMENT,
  MANAGE_VETO_REQUEST,
  SUBMIT_VETO_REQUEST,
  RESET_PASS_REQUEST,
  ASK_TO_RESET_PASS,
  SEARCH_VETO_PRODUCTS,
  DETAILED_HEALTH_PET
  ,VACCINE_RECORD_PATH,
  HEALTH_SCORE_PATH,
  VISIT_RECORD_PATH,
  SURGERY_RECORD_PATH,
  Medical_RECORD_PATH,
  MEDICAL_RECORD_PATH
} from './common/configuration/constants/Paths'
import BottomBar from './components/global/ButtomBar'
import "react-toastify/dist/ReactToastify.css";
import { messaging, requestPermissionAndGetToken } from './firebase'
import { onMessage } from 'firebase/messaging'
import useAuth from './hooks/useAuth'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { PetProvider } from './context/PetContext'



function App() {
  const [colorMode, theme] = useMode()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [showSidebar, setShowSidebar] = useState(!isMobile)
  const { currentUser } = useAuth();

  useEffect(() => {
   
    if (currentUser?.role) {
      requestPermissionAndGetToken();
  
      const unsubscribe = onMessage(messaging, (payload) => {       
        toast(payload.notification.body, {
          position: "bottom-right",
          className: 'custom-toast',
          icon: payload.notification.icon || '/default-icon.png',
          autoClose: 5000,
          style: {
            borderRadius: '8px',
            padding: '10px',
          }
        });
      });
  
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [currentUser]);
  
  


  useEffect(() => {
    const {role } = getAuthInfo()
    if (location.pathname === SIGN_UP_PATH || location.pathname === SUBMIT_VETO_REQUEST || location.pathname === RESET_PASS_REQUEST || location.pathname === ASK_TO_RESET_PASS) {
      return
    }
    if (role) {
      switch (role) {
        case ROLE_ADMIN: {
          const adminpaths = [
            USER_MANAGEMENT_PATH, PET_SHOP_MANAGEMENT , MANAGE_VETO_REQUEST 
          ]
          if (adminpaths.some(path => location.pathname === `${ADMIN_DASH_PATH}${path}`)) {
            return
          }
          navigate(`${ADMIN_DASH_PATH}`)
          break
        }
        case ROLE_CLIENT: {
          const clientPaths = [
            GPS_LOCATOR_PATH, ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH,
            COMMUNITY_PATH, DEFINE_SAFE_ZONE_PATH,
            HEALTH_MONITOR_PATH, HEALTH_PASSPORT_PATH, MARKET_PLACE_PATH,
            SET_ACTIVITY_GOALS_PATH, PET_PROFILE, USER_PROFILE , SEARCH_VETO_PRODUCTS, DETAILED_HEALTH_PET, VACCINE_RECORD_PATH, VISIT_RECORD_PATH, SURGERY_RECORD_PATH,
            MEDICAL_RECORD_PATH
          ];
          if (clientPaths.some(path => location.pathname === `${CLIENT_DASH_PATH}${path}`)) {
            return
          }
          navigate(`${CLIENT_DASH_PATH}`)
          break
        }
        case ROLE_VETO: {const vetoPaths = [
            VETO_NOTIFICATIONS_PATH, VETO_UPDATE_NOTES_PATH, VETO_UPDATE_TREATMENT_PATH ];
          if (vetoPaths.some(path => location.pathname === `${VETO_DASH_PATH}${path}`)) 
            { return;}
          navigate(`${VETO_DASH_PATH}`);
          break;}
        default:
          navigate(SIGN_IN_PATH);
          break;}} 
          else { navigate(SIGN_IN_PATH); } }, 
          [navigate, location.pathname]);
  useEffect(() => {
    setShowSidebar(!isMobile);}, [isMobile]);
  return (
  

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <PetProvider>
          <CssBaseline />
      
            {shouldShowSideBar(location.pathname) && showSidebar && <SideBar />}
            {shouldShowTopBar(location.pathname) && <TopBar />}
              <ProtectedRoutes />
              <Toaster expand visibleToasts={9} />
              <ToastContainer /> 

            {isMobile && shouldShowSideBar(location.pathname) && <BottomBar />}
            </PetProvider>
        </ThemeProvider>

      </ColorModeContext.Provider>

  
  );
}

export default App;
