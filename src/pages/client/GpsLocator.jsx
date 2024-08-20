import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Polygon } from 'react-leaflet';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ParkIcon from '@mui/icons-material/Park';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddSafeZoneButton from '../../components/AddSafeZoneButton';
import Footer from '../../common/configuration/constants/Footer';
import PetService from '../../service/PetService';
import '../../maps.css';
import '../../App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const petMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [3000, 3000], 
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowSize: [30, 30],});

const GpsLocator = () => {
  const theme = useTheme();
  const [zones, setZones] = useState([]);
  const [selectedSafeZone, setSelectedSafeZone] = useState(null);
  const [currentPetId, setCurrentPetId] = useState(null);
  const defaultPosition = [36.8065, 10.1815]; 
  const [center, setCenter] = useState(defaultPosition);
  const [realTimePosition, setRealTimePosition] = useState([]);
  const userId = localStorage.getItem('id');
  const [dangerZones,setDangerZones] = useState([]);

useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await PetService.getCurrentUserPets();
        console.log("Pet Data:", response); 
        if (response.length > 0) {
          const petId = response[0].id;
          localStorage.setItem('petId', petId); 
          setCurrentPetId(petId);}
      } catch (error) {
        console.error("Error fetching pet profile:", error); }};
         fetchPetProfile(); }, []);
       useEffect(() => {
       if (currentPetId) {
      const fetchSafeZones = async () => {
        try {
          const safeZones = await PetService.getSafeZones(currentPetId);
          console.log("Safe Zones Data:", safeZones); 
          setZones(safeZones);
          setSelectedSafeZone(null);
        } catch (error) {
          console.error('Error fetching safe zones:', error);
        }
      };
      const fetchDangerZones = async () => {
        try {
          const zones = await PetService.getDangerZonesByPet(currentPetId);
          console.log("Danger Zones Data:", zones); 
          setDangerZones(zones);
        } catch (error) {
          console.error("Failed to fetch danger zones:", error);
        }
      };
      fetchSafeZones();
      fetchDangerZones();
    }
  }, [currentPetId]);

  const isPointInPolygon = (point, polygon) => {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside; }
    return inside; };

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/location?userId=${userId}`);
    socket.onopen = () => {
      console.log('WebSocket connection established'); };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Real-time Position Data:', data);
      if (data.latitude !== undefined && data.longitude !== undefined) {
        const petPosition = [data.latitude, data.longitude];
        setRealTimePosition(petPosition);
        setCenter(petPosition); 
        const isInsideAnyZone = zones.some((zone) => {
        const polygon = zone.positions.map(pos => [pos.lat, pos.lng]);
        return isPointInPolygon(petPosition, polygon);  });

        if (!isInsideAnyZone) {
          console.warn("Le pet est hors de la zone de sécurité !"); }
      } else {
        console.warn('Latitude or Longitude is undefined');
      } };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);};

    socket.onclose = (event) => {
      console.log('WebSocket connection closed', event);};
    return () => socket.close(); },
     [userId, zones]);

  const handleSafeZoneClick = async (zoneName) => {
    if (!currentPetId) {
      console.error('Pet ID is not defined');
      return;}
    setSelectedSafeZone(zoneName); 
    try {
      const zoneTypeMap = {
        'Home': 'HOME',
        'Vet': 'VET',
        'Park': 'PARK',
      };

      const zoneType = zoneTypeMap[zoneName];
      if (!zoneType) {
        console.error('Unknown zone type:', zoneName);
        return;}
      let response;
      if (zoneType === 'HOME') {
        response = await PetService.getHomePositions(currentPetId);
      } else if (zoneType === 'VET') {
        response = await PetService.getVetPositions(currentPetId);
      } else if (zoneType === 'PARK') {
        response = await PetService.getParkPositions(currentPetId);
      }
      console.log("Selected Zone Data:", response);
      if (response && response.length > 0) {
        setCenter([response[0].lat, response[0].lng]); 
      } else {
        console.warn('No positions found for zone:', zoneName);
      } } catch (error) {
         console.error('Error fetching positions:', error);
    }};
  const safeZones = [
    { name: 'Home', description: 'Your cozy place', icon: <HomeIcon sx={{ color: 'black' }} />, type: 'HOME' },
    { name: 'Park', description: 'A fun outdoor space', icon: <ParkIcon sx={{ color: 'black' }} />, type: 'PARK' },
    { name: 'Vet', description: 'For health checkups', icon: <LocalHospitalIcon sx={{ color: 'black' }} />, type: 'VET' },];
  return (
    <div style={{ position: 'relative', height: '100vh', paddingBottom: '60px' }}>
      <div className="map-container">
        <MapContainer center={center} zoom={12} className="leaflet-container">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {zones.map((zone) =>
            zone.positions.map((pos, index) => (
              <Circle
                key={`${zone.id}-${index}`}
                center={[pos.lat, pos.lng]}
                radius={1000} 
                color={theme.palette.custom.circleMapSafe || '#00FF00'}
                fillColor={theme.palette.custom.circleMapSafe || '#00FF00'}
                fillOpacity={0.4}
              />
            ))
          )}
       {dangerZones.map((zone, index) => (
        <Polygon
          key={index}
          positions={zone.positions.map(pos => [pos.lat, pos.lng])}
          color="red"
          fillColor="red"
          fillOpacity={0.4} /> ))}
          {realTimePosition.length > 0 && (
          <Marker position={realTimePosition}icon={petMarkerIcon} />)}
          </MapContainer>
      </div>
      <AddSafeZoneButton className="add-safe-zone-button" onClick={() => handleSafeZoneClick(selectedSafeZone)} />
      <Box className="safe-zones-panel">
        <h2 className="safe-zones-header">Select Safe Zone</h2>
        <List>
          {safeZones.map((zone, index) => (
            <ListItem
              key={index}
              button  selected={selectedSafeZone === zone.name}
              onClick={() => handleSafeZoneClick(zone.name)}
              style={{ cursor: 'pointer' }}>
              <ListItemIcon>{zone.icon}</ListItemIcon>
              <ListItemText primary={zone.name} secondary={zone.description} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Footer />
    </div>
  );
};
export default GpsLocator;
