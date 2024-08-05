import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import ClientDashboard from '../pages/Dashboard/ClientDashboard';
import VetoDashboard from '../pages/Dashboard/VetoDashboard';
import ProtectedRoute from './ProtectedRoute';
import ActivityTracker from '../pages/client/ActivityTracker';
import BreedAuthenticity from '../pages/client/BreedAuthenticity';
import Community from '../pages/client/Community';
import DefineSafeZone from '../pages/client/DefineSafeZone';
import HealthMonitor from '../pages/client/HealthMonitor';
import HealthPassport from '../pages/client/HealthPassport/HealthPassport';
import SetActivityGoals from '../pages/client/SetActivityGoals';
import GpsLocator from '../pages/client/GpsLocator';
import MarketPlace from '../pages/client/MarketPlace';
import UserManagement from '../pages/admin/UserManagement';
import PetProfile from "../pages/client/PetProfile";
import UserProfile from "../pages/client/UserProfile";
import UpdateMedicalNotes from '../pages/veto/UpdateMedicalNotes';
import UpdateTreatmentPlans from '../pages/veto/UpdateTreatmentPlans';
import Notifications from '../pages/veto/Notifications';
import PetShopManagement from '../pages/admin/PetShopManagement';
import {
  ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH, HEALTH_PASSPORT_PATH, COMMUNITY_PATH, DEFINE_SAFE_ZONE_PATH,
  GPS_LOCATOR_PATH, HEALTH_MONITOR_PATH, MARKET_PLACE_PATH, PET_SHOP_MANAGEMENT, SET_ACTIVITY_GOALS_PATH,
  VETO_NOTIFICATIONS_PATH, VETO_UPDATE_NOTES_PATH, VETO_UPDATE_TREATMENT_PATH,
  VACCINE_RECORD_PATH,
  VISIT_RECORD_PATH,
  SURGERY_RECORD_PATH,
  MEDICAL_RECORD_PATH
} from '../common/configuration/constants/Paths';
import {
  SIGN_UP_PATH, SIGN_IN_PATH, ADMIN_DASH_PATH, CLIENT_DASH_PATH, VETO_DASH_PATH, USER_MANAGEMENT_PATH,
  PET_PROFILE, USER_PROFILE
} from '../common/configuration/constants/Paths';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../common/configuration/constants/UserRole';
import VaccineRecord from '../pages/client/HealthPassport/VaccineRecord/VaccineRecord';
import VisitRecord from '../pages/client/HealthPassport/VisitRecord';
import SurgeryRecord from '../pages/client/HealthPassport/SurgeryRecord';
import MedicalRecord from '../pages/client/HealthPassport/MedicalRecord';


const ProtectedRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to={SIGN_IN_PATH} replace />} /> {/* Redirect to SignIn by default */}

    <Route
      path={`${ADMIN_DASH_PATH}/*`}
      element={
        <ProtectedRoute roles={[ROLE_ADMIN]}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path={USER_MANAGEMENT_PATH} element={<UserManagement />} />
            <Route path={PET_SHOP_MANAGEMENT} element={<PetShopManagement />} />
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
            <Route path={GPS_LOCATOR_PATH} element={<GpsLocator />} />
            <Route path={ACTIVITY_TRACKER_PATH} element={<ActivityTracker />} />
            <Route path={BREED_AUTHENTICITY_PATH} element={<BreedAuthenticity />} />
            <Route path={COMMUNITY_PATH} element={<Community />} />
            <Route path={USER_PROFILE} element={<UserProfile />} />
            <Route path={DEFINE_SAFE_ZONE_PATH} element={<DefineSafeZone />} />
            <Route path={HEALTH_MONITOR_PATH} element={<HealthMonitor />} />
            <Route path={HEALTH_PASSPORT_PATH} element={<HealthPassport />} />
            <Route path={MARKET_PLACE_PATH} element={<MarketPlace />} />
            <Route path={SET_ACTIVITY_GOALS_PATH} element={<SetActivityGoals />} />
            <Route path={PET_PROFILE} element={<PetProfile />} />
            <Route path={VACCINE_RECORD_PATH} element={<VaccineRecord />} />
            <Route path={VISIT_RECORD_PATH} element={<VisitRecord />} />
            <Route path={SURGERY_RECORD_PATH} element={<SurgeryRecord />} />
            <Route path={MEDICAL_RECORD_PATH} element={<MedicalRecord />} />
          </Routes>
        </ProtectedRoute>
      }
    />

    <Route
      path={`${VETO_DASH_PATH}/*`}
      element={
        <ProtectedRoute roles={[ROLE_VETO]}>
          <Routes>
            <Route path="/" element={<VetoDashboard />} />
            <Route path={VETO_NOTIFICATIONS_PATH} element={<Notifications />} />
            <Route path={VETO_UPDATE_NOTES_PATH} element={<UpdateMedicalNotes />} />
            <Route path={VETO_UPDATE_TREATMENT_PATH} element={<UpdateTreatmentPlans />} />
          </Routes>
        </ProtectedRoute>
      }
    />
    <Route path={SIGN_IN_PATH} element={<SignIn />} />
    <Route path={SIGN_UP_PATH} element={<SignUp />} />
  </Routes>
);

export default ProtectedRoutes;
