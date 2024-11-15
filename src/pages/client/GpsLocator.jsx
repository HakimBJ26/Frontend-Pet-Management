import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Polygon, useMap } from 'react-leaflet';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddSafeZoneButton from '../../components/AddSafeZoneButton';
import Footer from '../../common/configuration/constants/Footer';
import PetService from '../../service/PetService';
import '../../maps.css';
import '../../App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultPosition } from '../../common/configuration/constants/MapsConstant';
import { MAP_ATTRIBUTION, MAP_URL, SAFE_ZONES } from '../../common/configuration/constants/MapsConstant';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PetContext } from '../../context/PetContext';
import { useNavigate } from 'react-router-dom';

const petMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 30], 
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowSize: [30, 30],
});

const MapCenterUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => 
    { if (center) { map.setView(center); 
   }}, [center, map]);
    return null;
};

const GpsLocator = () => {
  const theme = useTheme();
  const [zones, setZones] = useState([]);
  const [selectedSafeZone, setSelectedSafeZone] = useState(null);
  const [center, setCenter] = useState(defaultPosition);
  const [realTimePosition, setRealTimePosition] = useState([]);
  const [dangerZones, setDangerZones] = useState([]);
  const [notifiedPositions, setNotifiedPositions] = useState(new Set());
  const { selectedPetId } = useContext(PetContext);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPetId) {
      const fetchSafeZones = async () => {
        try {
          const safeZones = await PetService.getSafeZones(selectedPetId);
          setZones(safeZones);
          setSelectedSafeZone(null);
        } catch (error) {
          console.error('Error fetching safe zones:', error);
        }
      };

      const fetchDangerZones = async () => {
        try {
          const zones = await PetService.getDangerZonesByPet(selectedPetId);
          setDangerZones(zones);
        } catch (error) {
          console.error("Failed to fetch danger zones:", error);
        }
      };

      fetchSafeZones();
      fetchDangerZones();  
    }
  }, [selectedPetId]);

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/location?userId=${userId}`);
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.latitude !== undefined && data.longitude !== undefined) {
        const petPosition = [data.latitude, data.longitude];
        setRealTimePosition(petPosition);
        setCenter(petPosition);

        if (selectedPetId && zones.length > 0) { 
          const isInsideAnyZone = await PetService.checkPetInSafeZone(selectedPetId);
          if (!isInsideAnyZone) {
            const positionKey = `${petPosition[0]},${petPosition[1]}`;
            if (!notifiedPositions.has(positionKey)) {
              toast.warn("Le pet est hors de la zone de sécurité !");
              setNotifiedPositions(new Set(notifiedPositions.add(positionKey)));
            }
          }
        }
      } else {
        console.warn('Latitude or Longitude is undefined');
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
    };

    return () => socket.close();
  }, [userId, selectedPetId, notifiedPositions, zones]); 

  const handleSafeZoneClick = async (zoneName) => {
    if (!selectedPetId) {
      console.error('Pet ID is not defined');
      return;
    }
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
        return;
      }
      let response;
      if (zoneType === 'HOME') {
        response = await PetService.getHomePositions(selectedPetId);
      } else if (zoneType === 'VET') {
        response = await PetService.getVetPositions(selectedPetId);
      } else if (zoneType === 'PARK') {
        response = await PetService.getParkPositions(selectedPetId);
      }
      if (response && response.length > 0) {
        setCenter([response[0].lat, response[0].lng]);
      } else {
        console.warn('No positions found for zone:', zoneName);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };
  return (
    <div style={{ position: 'relative', height: '100vh', paddingBottom: '60px' }}>
      <div className="map-container">
        <MapContainer center={center} zoom={12} className="leaflet-container">
          <MapCenterUpdater center={center} />
          <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
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
              fillOpacity={0.4} />
          ))}
          {realTimePosition.length > 0 && (
            <Marker position={realTimePosition} icon={petMarkerIcon} />
          )}
        </MapContainer>
      </div>
      <AddSafeZoneButton className="add-safe-zone-button" onClick={() => navigate('/dashboard_client/define_safe_zone')} />
      <Box className="safe-zones-panel">
        <h2 className="safe-zones-header">Select Safe Zone</h2>
        <List>
          {SAFE_ZONES.map((zone, index) => (
            <ListItem
              key={index}
              button
              selected={selectedSafeZone === zone.name}
              onClick={() => handleSafeZoneClick(zone.name)}
              style={{ cursor: 'pointer' }}>
              <ListItemIcon>{zone.icon}</ListItemIcon>
              <ListItemText primary={zone.name} secondary={zone.description} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default GpsLocator;