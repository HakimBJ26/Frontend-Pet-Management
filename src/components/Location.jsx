import React, { useEffect, useState } from 'react';
import { LOCATION_CANAL} from '../common/configuration/constants/webSocketSub';
import WebSocketService from '../service/WebSocketService';

const Location = () => {
  const userId = localStorage.getItem('id');

  const [locationData, setLocationData] = useState({ 
    latitude: null, 
    longitude: null
  });



  useEffect(() => {
    console.log("Attempting to open WebSocket connections...");


    const locationService = new WebSocketService(LOCATION_CANAL, userId);

    locationService.connect((data) => {
      if (data.latitude !== undefined) {
        setLocationData(data);
      }
    });

    return () => {
      locationService.close();
    };
  }, [userId]);


  return (
    <div>
      <h1>Location Data</h1>
      <p>Latitude: {locationData.latitude}</p>
      <p>Longitude: {locationData.longitude}</p>
    </div>
  );
};

export default Location;
