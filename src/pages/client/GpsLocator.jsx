import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
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

const GpsLocator = () => {
  const theme = useTheme();
  const [zones, setZones] = useState([]);
  const [selectedSafeZone, setSelectedSafeZone] = useState(null);
  const [currentPetId, setCurrentPetId] = useState(null);
  const position = [36.8065, 10.1815]; // Position par défaut
  const [center, setCenter] = useState(position);

  useEffect(() => {
    const fetchSafeZones = async (petId) => {
      try {
        const safeZones = await PetService.getSafeZones(petId);
        console.log("Safe Zones Data:", safeZones); // Vérifiez les données ici
        setZones(safeZones);
        setSelectedSafeZone(null); // Réinitialiser la sélection de la zone
      } catch (error) {
        console.error('Error fetching safe zones:', error);
      }
    };

    const fetchPetProfile = async () => {
      try {
        const response = await PetService.getCurrentUserPets();
        console.log("Pet Data:", response); // Vérifiez les données des animaux
        if (response.length > 0) {
          const petId = response[0].id;
          localStorage.setItem('petId', petId); // Stocker l'ID dans le local storage
          setCurrentPetId(petId);
          fetchSafeZones(petId); // Utiliser l'ID du premier animal pour tester
        }
      } catch (error) {
        console.error("Error fetching pet profile:", error);
      }
    };

    fetchPetProfile();
  }, []);

 const handleSafeZoneClick = async (zoneName) => {
  if (!currentPetId) {
    console.error('Pet ID is not defined');
    return;
  }
  setSelectedSafeZone(zoneName); // Définir la zone sélectionnée

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
      response = await PetService.getHomePositions(currentPetId);
    } else if (zoneType === 'VET') {
      response = await PetService.getVetPositions(currentPetId);
    } else if (zoneType === 'PARK') {
      response = await PetService.getParkPositions(currentPetId);
    }

    console.log("Selected Zone Data:", response);

    if (response && response.length > 0) {
      setCenter([response[0].lat, response[0].lng]); // Centrer sur la première position
    } else {
      console.warn('No positions found for zone:', zoneName);
    }
  } catch (error) {
    console.error('Error fetching positions:', error);
  }
};

  const safeZones = [
    { name: 'Home', description: 'Your cozy place', icon: <HomeIcon sx={{ color: 'black' }} />, type: 'HOME' },
    { name: 'Park', description: 'A fun outdoor space', icon: <ParkIcon sx={{ color: 'black' }} />, type: 'PARK' },
    { name: 'Vet', description: 'For health checkups', icon: <LocalHospitalIcon sx={{ color: 'black' }} />, type: 'VET' },
  ];

  return (
    <div style={{ position: 'relative', height: '100vh', paddingBottom: '60px' }}>
      <div className="map-container">
        <MapContainer center={center} zoom={12} className="leaflet-container">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Affichage des zones de sécurité récupérées depuis le backend */}
          {zones.map((zone) =>
            zone.positions.map((pos, index) => (
              <Circle
                key={`${zone.id}-${index}`}
                center={[pos.lat, pos.lng]}
                radius={1000} // Ajustez selon vos besoins
                color={theme.palette.custom.circleMapSafe || '#00FF00'}
                fillColor={theme.palette.custom.circleMapSafe || '#00FF00'}
                fillOpacity={0.4}
              />
            ))
          )}
        </MapContainer>
      </div>

      <AddSafeZoneButton className="add-safe-zone-button" onClick={() => handleSafeZoneClick(selectedSafeZone)} />
      <Box className="safe-zones-panel">
        <h2 style={{ marginTop: '0' }}>Predefined Safe Zones</h2>
        <List>
          {safeZones.map((zone) => (
            <ListItem
              key={zone.name}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: `${zone.name === selectedSafeZone ? 'green' : ''}` }}
              onClick={() => handleSafeZoneClick(zone.name)}
            >
              <ListItemText
                primary={<span style={{ fontWeight: 'bold' }}>{zone.name}</span>}
                secondary={<span>{zone.description}</span>}
                primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                secondaryTypographyProps={{ style: { display: 'block' } }}
              />
              <ListItemIcon>
                {zone.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
      <Footer />
    </div>
  );
};

export default GpsLocator;
