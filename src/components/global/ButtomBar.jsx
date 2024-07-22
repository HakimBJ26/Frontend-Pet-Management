import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { 
    CLIENT_DASH_PATH, ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH, COMMUNITY_PATH, 
    DEFINE_SAFE_ZONE_PATH, GPS_LOCATOR_PATH, HEALTH_MONITOR_PATH, HEALTH_PASSPORT_PATH, 
    MARKET_PLACE_PATH, SET_ACTIVITY_GOALS_PATH, VETO_NOTIFICATIONS_PATH, VETO_UPDATE_NOTES_PATH, 
    VETO_UPDATE_TREATMENT_PATH, VETO_DASH_PATH, PET_PROFILE, USER_PROFILE, ADMIN_DASH_PATH, 
    PET_SHOP_MANAGEMENT, USER_MANAGEMENT_PATH 
} from '../../common/configuration/constants/Paths';
import { getAuthInfo } from '../../utils/authCred';
import { ROLE_CLIENT, ROLE_VETO } from '../../common/configuration/constants/UserRole';

function BottomBar() {
    const location = useLocation();
    const role = getAuthInfo().role;

    const clientLinks = [
        { to: `${CLIENT_DASH_PATH}${USER_PROFILE}`, icon: <AssignmentOutlinedIcon fontSize="small" />, label: 'User Profile' },
        { to: `${CLIENT_DASH_PATH}${PET_PROFILE}`, icon: <MedicalServicesOutlinedIcon fontSize="small" />, label: 'Pet Profile' },
        { to: `${CLIENT_DASH_PATH}${ACTIVITY_TRACKER_PATH}`, icon: <FitnessCenterOutlinedIcon fontSize="small" />, label: 'Activity Tracker' },
        { to: `${CLIENT_DASH_PATH}${SET_ACTIVITY_GOALS_PATH}`, icon: <AssignmentOutlinedIcon fontSize="small" />, label: 'Set Goals' },
        { to: `${CLIENT_DASH_PATH}${HEALTH_MONITOR_PATH}`, icon: <HealthAndSafetyOutlinedIcon fontSize="small" />, label: 'Health Monitor' },
        { to: `${CLIENT_DASH_PATH}${HEALTH_PASSPORT_PATH}`, icon: <MapOutlinedIcon fontSize="small" />, label: 'Health Passport' },
        { to: `${CLIENT_DASH_PATH}${DEFINE_SAFE_ZONE_PATH}`, icon: <DashboardOutlinedIcon fontSize="small" />, label: 'Safe Zone' },
        { to: `${CLIENT_DASH_PATH}${GPS_LOCATOR_PATH}`, icon: <LocationOnOutlinedIcon fontSize="small" />, label: 'GPS Locator' },
        { to: `${CLIENT_DASH_PATH}${MARKET_PLACE_PATH}`, icon: <StorefrontOutlinedIcon fontSize="small" />, label: 'Marketplace' },
        { to: `${CLIENT_DASH_PATH}${COMMUNITY_PATH}`, icon: <GroupOutlinedIcon fontSize="small" />, label: 'Community' },
        { to: `${CLIENT_DASH_PATH}${BREED_AUTHENTICITY_PATH}`, icon: <PetsOutlinedIcon fontSize="small" />, label: 'Breed Auth' },
    ];

    const vetoLinks = [
        { to: VETO_DASH_PATH, icon: <DashboardOutlinedIcon fontSize="small" />, label: 'Dashboard' },
        { to: `${VETO_DASH_PATH}${VETO_NOTIFICATIONS_PATH}`, icon: <NotificationsOutlinedIcon fontSize="small" />, label: 'Requests' },
        { to: `${VETO_DASH_PATH}${VETO_UPDATE_NOTES_PATH}`, icon: <AssignmentOutlinedIcon fontSize="small" />, label: 'Notes' },
        { to: `${VETO_DASH_PATH}${VETO_UPDATE_TREATMENT_PATH}`, icon: <MedicalServicesOutlinedIcon fontSize="small" />, label: 'Treatment' },
    ];

    const adminLinks = [
        { to: ADMIN_DASH_PATH, icon: <DashboardOutlinedIcon fontSize="small" />, label: 'Dashboard' },
        { to: `${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`, icon: <AssignmentOutlinedIcon fontSize="small" />, label: 'User Mgmt' },
        { to: `${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENT}`, icon: <StorefrontOutlinedIcon fontSize="small" />, label: 'Pet Shop' },
    ];

    const links = role === ROLE_CLIENT ? clientLinks : role === ROLE_VETO ? vetoLinks : adminLinks;

    return (
        <BottomNavigation
            showLabels
            value={location.pathname}
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1300,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1px',
              
            }}
        >
            {links.map((link, index) => (
                <BottomNavigationAction
                    key={index}
                    component={Link}
                    to={link.to}
                    label={link.label}
                    icon={link.icon}
                    value={link.to}
                    sx={{
                        minWidth: 'auto',
                        padding: '0 1px',
                        '.MuiBottomNavigationAction-label': {
                            fontSize: '0.5rem',
                        },
                        '.MuiSvgIcon-root': {
                            fontSize: '0.8rem',
                        },
                    }}
                />
            ))}
        </BottomNavigation>
    );
}

export default BottomBar;
