import React, { useEffect, useState } from 'react';
import WebSocketService from '../service/WebSocketService';
import { LOCATION_CANAL } from '../common/configuration/constants/webSocketSub';
  const Location = () => {
  const userId = localStorage.getItem('id');
  const [locationData, setLocationData] = useState({ latitude: null, longitude: null });
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not defined.");
      return; }
    const locationService = new WebSocketService(LOCATION_CANAL, userId, () => {
      console.warn("WebSocket fallback function triggered.");
    });
    locationService.connect((data) => {
            setLocationData(data); });
    return () => { locationService.close(); };}, [userId]);
  return (
    <div>
      <h1>Location Data</h1>
      <p>Latitude: {locationData.latitude}</p>
      <p>Longitude: {locationData.longitude}</p>
    </div>
  );
};
export default Location;
