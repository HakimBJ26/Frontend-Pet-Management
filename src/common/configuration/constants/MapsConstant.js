import HomeIcon from '@mui/icons-material/Home';
import ParkIcon from '@mui/icons-material/Park';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const defaultPosition = [36.8065, 10.1815];
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const SAFE_ZONES = [
    { name: 'Home', description: 'Your cozy place', icon: <HomeIcon sx={{ color: 'black' }} />, type: 'HOME' },
    { name: 'Park', description: 'A fun outdoor space', icon: <ParkIcon sx={{ color: 'black' }} />, type: 'PARK' },
    { name: 'Vet', description: 'For health checkups', icon: <LocalHospitalIcon sx={{ color: 'black' }} />, type: 'VET' },
  ];