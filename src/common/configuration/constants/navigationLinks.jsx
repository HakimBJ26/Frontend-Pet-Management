import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    CLIENT_DASH_PATH, ACTIVITY_TRACKER_PATH, BREED_AUTHENTICITY_PATH, COMMUNITY_PATH,
    DEFINE_SAFE_ZONE_PATH, GPS_LOCATOR_PATH, HEALTH_MONITOR_PATH, HEALTH_PASSPORT_PATH,
    MARKET_PLACE_PATH, SET_ACTIVITY_GOALS_PATH, VETO_NOTIFICATIONS_PATH, VETO_UPDATE_NOTES_PATH,
    VETO_UPDATE_TREATMENT_PATH, VETO_DASH_PATH, PET_PROFILE, USER_PROFILE, ADMIN_DASH_PATH,
    PET_SHOP_MANAGEMENT, USER_MANAGEMENT_PATH, SEARCH_VETO_PRODUCTS
} from '../constants/Paths'

export const clientLinks = [
    { to: `${CLIENT_DASH_PATH}`, icon: <HomeIcon  /> },
    { to: `${CLIENT_DASH_PATH}${USER_PROFILE}`, icon: <PersonIcon  /> },
    { to: `${CLIENT_DASH_PATH}${PET_PROFILE}`, icon: <PetsIcon  />},
    { to: `${CLIENT_DASH_PATH}${ACTIVITY_TRACKER_PATH}`, icon: <EventAvailableIcon  /> },
    { to: `${CLIENT_DASH_PATH}${SET_ACTIVITY_GOALS_PATH}`, icon: <NoteAddIcon  />},
    { to: `${CLIENT_DASH_PATH}${HEALTH_MONITOR_PATH}`, icon: <FavoriteIcon  /> },
    { to: `${CLIENT_DASH_PATH}${HEALTH_PASSPORT_PATH}`, icon: <MapOutlinedIcon  />},
    { to: `${CLIENT_DASH_PATH}${DEFINE_SAFE_ZONE_PATH}`, icon: <HomeIcon  /> },
    { to: `${CLIENT_DASH_PATH}${GPS_LOCATOR_PATH}`, icon: <LocationOnIcon  /> },
    { to: `${CLIENT_DASH_PATH}${MARKET_PLACE_PATH}`, icon: <StorefrontOutlinedIcon  />},
    { to: `${CLIENT_DASH_PATH}${COMMUNITY_PATH}`, icon: <GroupOutlinedIcon  />},
    { to: `${CLIENT_DASH_PATH}${BREED_AUTHENTICITY_PATH}`, icon: <PetsOutlinedIcon  /> },
    { to: `${CLIENT_DASH_PATH}${SEARCH_VETO_PRODUCTS}`, icon: <PersonSearchIcon  />},

]

export const vetoLinks = [
    { to: VETO_DASH_PATH, icon: <HomeIcon  /> },
    { to: `${VETO_DASH_PATH}${VETO_NOTIFICATIONS_PATH}`, icon: <NotificationsOutlinedIcon  /> },
    { to: `${VETO_DASH_PATH}${VETO_UPDATE_NOTES_PATH}`, icon: <PersonIcon  />},
    { to: `${VETO_DASH_PATH}${VETO_UPDATE_TREATMENT_PATH}`, icon: <PetsIcon  />},
]

export const adminLinks = [
    { to: ADMIN_DASH_PATH, icon: <HomeIcon  />, label: 'Dashboard' },
    { to: `${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`, icon: <PersonIcon  /> },
    { to: `${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENT}`, icon: <StorefrontOutlinedIcon  /> },
];
