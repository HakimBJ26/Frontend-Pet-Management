import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ParkIcon from '@mui/icons-material/Park';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddSafeZoneButton from '../../components/AddSafeZoneButton';
import '../../maps.css';
import { addZones } from '../../mapUtils';
import Footer from '../../common/configuration/constants/Footer';
import MapNavBar from '../../components/global/MapNavBar'; 
//import  { GOOGLE_MAPS_API_KEY } from '../../../src/common/configuration/constants/ApiKey'

const GpsLocator = () => {
  const theme = useTheme();
  const [map, setMap] = useState(null);
  const [zones, setZones] = useState([]);
  const mapRef = useRef(null);
  const center = {
    lat: 36.8358120199345,
    lng: 10.208134407944877,};
  useEffect(() => {
    if (map) {
      addZones(map, center, theme);
    }
  }, [map]);

  const handleAddSafeZone = () => {setZones((prevZones) => [ ...prevZones, { center, radius: 100 },]);};
  useEffect(() => {
    if (map && zones.length > 0) {
        map.data.forEach((feature) => {
        map.data.remove(feature);});
      zones.forEach((zone) => {
        new window.google.maps.Circle({
          center: zone.center,
          radius: zone.radius,
          fillColor: theme.palette.custom.circleMapSafe,
          fillOpacity: 0.35,
          strokeColor: '#00FF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          map: map,});
      });}}, [map, zones, theme]);
  const safeZones = [
    { name: 'Home', description: 'Your cozy place', icon: <HomeIcon sx={{ color: 'black' }} /> },
    { name: 'Park', description: 'A fun outdoor space', icon: <ParkIcon sx={{ color: 'black' }} /> },
    { name: 'Vet', description: 'For health checkups', icon: <LocalHospitalIcon sx={{ color: 'black' }} /> }, ];
  return (
    <div style={{ position: 'relative', height: '100vh', paddingBottom: '60px' }}>
      <MapNavBar /> 
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
          onLoad={(map) => setMap(map)}
          ref={mapRef} >
        </GoogleMap>
      </LoadScript>
      <AddSafeZoneButton className="add-safe-zone-button" onClick={handleAddSafeZone} />
      <Box className="safe-zones-panel">
        <h2 style={{ marginTop: '0' }}>Predefined Safe Zones</h2>
        <List>
          {safeZones.map((zone) => (
            <ListItem key={zone.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <ListItemText
                primary={<span style={{ fontWeight: 'bold' }}>{zone.name}</span>}
                secondary={<span>{zone.description}</span>}
                primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                secondaryTypographyProps={{ style: { display: 'block' } }}/>
              <ListItemIcon>
                {zone.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
      <Footer/>
    </div>
  );
};

export default GpsLocator;
