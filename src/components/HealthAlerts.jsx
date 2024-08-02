import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import '../styles/HealthAlerts.css';
import { getSeverityColor } from '../utils/SeverityColor';
import AlertsService from '../service/AlertsService';




const HealthAlerts = ({ healthAlertsData }) => {

  const handleDelete= (id)=>{
    const dismissALert=async()=>{
      try{
        const res = await AlertsService.deleteAlerts(id)
      }catch(err){
        console.log(err)
      }
    }
    dismissALert()
  }
  return (
    <Box className="health-alerts-container">
      {healthAlertsData.map((healthAlert, index) => (
        <Paper key={index} className="health-alert-paper">
          <Box className="health-alert-header">
            <Typography variant="h5" fontWeight="bold">{healthAlert.title}</Typography>
            <Typography
              className="health-alert-severity"
              style={{ color: getSeverityColor(healthAlert.severity) }}
            >
              {healthAlert.severity}
            </Typography>
          </Box>
          <Typography textAlign="center">Action: {healthAlert.action}.</Typography>
          <Button variant="contained" fullWidth color="success" onClick={()=>{
            handleDelete(healthAlert.id)
          }}>Dismiss</Button>
        </Paper>
      ))}
    </Box>
  );
};

export default HealthAlerts;
