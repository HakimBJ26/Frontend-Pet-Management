import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import "../styles/HealthAlerts.css";
import { getSeverityColor } from "../utils/SeverityColor";
import AlertsService from "../service/AlertsService";
import useToast from "../hooks/useToast";
import {
  ERROR_DELETE_ALERT_TOAST,
  SUCCESS_DELETE_ALERT_TOAST,
} from "../common/configuration/constants/ToastConfig";

const HealthAlerts = ({ healthAlertsData }) => {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    setAlerts(healthAlertsData);
  }, [healthAlertsData]);

  const dismissAlert = async (id) => {
    try {
      await AlertsService.deleteAlerts(id);
      showToast(SUCCESS_DELETE_ALERT_TOAST);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    } catch (err) {
      showToast(ERROR_DELETE_ALERT_TOAST);
      console.error("Error dismissing alert:", err);
    }
  };

  const handleDelete = (id) => {
    dismissAlert(id);
  };

  return (
    <Box className="health-alerts-container">
      {alerts?.map((healthAlert, index) => (
        <Paper key={index} className="health-alert-paper">
          <Box className="health-alert-header">
            <Typography variant="h5" fontWeight="bold">
              {healthAlert.title}
            </Typography>
            <Typography
              className="health-alert-severity"
              style={{ color: getSeverityColor(healthAlert.severity) }}
            >
              {healthAlert.severity}
            </Typography>
          </Box>
          <Typography textAlign="center">
            Action: {healthAlert.action}.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={() => handleDelete(healthAlert.id)}
          >
            Dismiss
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default HealthAlerts;
