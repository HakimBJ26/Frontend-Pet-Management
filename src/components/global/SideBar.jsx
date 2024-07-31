import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Menu } from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SideBarItem from './SideBarItem';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';
import {
  CLIENT_DASH_PATH,
  ACTIVITY_TRACKER_PATH,
  BREED_AUTHENTICITY_PATH,
  COMMUNITY_PATH,
  DEFINE_SAFE_ZONE_PATH,
  GPS_LOCATOR_PATH,
  HEALTH_MONITOR_PATH,
  HEALTH_PASSPORT_PATH,
  MARKET_PLACE_PATH,
  SET_ACTIVITY_GOALS_PATH,
  VETO_NOTIFICATIONS_PATH,
  VETO_UPDATE_NOTES_PATH,
  VETO_UPDATE_TREATMENT_PATH,
  VETO_DASH_PATH,
  PET_PROFILE,
  USER_PROFILE,
  ADMIN_DASH_PATH,
  PET_SHOP_MANAGEMENT,
  USER_MANAGEMENT_PATH,
  MANAGE_VETO_REQUEST
} from '../../common/configuration/constants/Paths';
import { getAuthInfo } from '../../utils/authCred';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../../common/configuration/constants/UserRole';
import StyledSidebar from '../styledComponents/StyledSideBar';
import StyledMenuItem from '../styledComponents/StyledMenuItem';

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('');
  const role = getAuthInfo().role;

  return (
    <Box
    className={`sidebar-box ${isCollapsed ? 'collapsed' : 'expanded'}`}
  >
      {role ? (
        <StyledSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <StyledMenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            >
              {!isCollapsed && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', ml: 2 }}>
                    Petagora
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </StyledMenuItem>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {!isCollapsed && (
                <Box mt={2} px={2}>
                  {role === ROLE_CLIENT && (
                    <>
                      <Link to={CLIENT_DASH_PATH} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Home" icon={<DashboardOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${USER_PROFILE}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="User Profile" icon={<AnalyticsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${PET_PROFILE}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Pet Profile" icon={<MedicalServicesOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${ACTIVITY_TRACKER_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Activity Tracker" icon={<FitnessCenterOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${SET_ACTIVITY_GOALS_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Set Activity Goals" icon={<AssignmentOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${HEALTH_MONITOR_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Health Monitor" icon={<HealthAndSafetyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${HEALTH_PASSPORT_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Health Passport" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${DEFINE_SAFE_ZONE_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Define Safe Zone" icon={<DashboardOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${GPS_LOCATOR_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="GPS Locator" icon={<LocationOnOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${MARKET_PLACE_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Marketplace" icon={<StorefrontOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${COMMUNITY_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Community" icon={<GroupOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${CLIENT_DASH_PATH}${BREED_AUTHENTICITY_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Breed Authenticity" icon={<PetsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                    </>
                  )}
                  {role === ROLE_VETO && (
                    <>
                      <Link to={VETO_DASH_PATH} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Dashboard" icon={<DashboardOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${VETO_DASH_PATH}${VETO_NOTIFICATIONS_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Appointment Requests" icon={<NotificationsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${VETO_DASH_PATH}${VETO_UPDATE_NOTES_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Update Medical Notes" icon={<AssignmentOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${VETO_DASH_PATH}${VETO_UPDATE_TREATMENT_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Update Treatment Plans" icon={<MedicalServicesOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                    </>
                  )}
                  {role === ROLE_ADMIN && (
                    <>
                      <Link to={ADMIN_DASH_PATH} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Dashboard" icon={<DashboardOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="User Management" icon={<GroupOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENT}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="Pet Shop Management" icon={<StorefrontOutlinedIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                      <Link to={`${ADMIN_DASH_PATH}${MANAGE_VETO_REQUEST}`} style={{ textDecoration: 'none' }}>
                        <SideBarItem title="VETO Request Management" icon={<ManageAccountsIcon />} selected={selected} setSelected={setSelected} />
                      </Link>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Menu>
        </StyledSidebar>
      ) : null}
    </Box>
  );
}

export default SideBar;
