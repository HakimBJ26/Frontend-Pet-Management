import {
  BoltOutlined,
  MonitorHeartOutlined,
  ThermostatOutlined,
} from "@mui/icons-material";
import { Card, Container, Typography } from "@mui/material";
import React from "react";

export default function PetActivityCards({ petActivityData, trackingPaused }) {
  const trackingStatus =
    trackingPaused === true
      ? "paused ⏸"
      : petActivityData.activityLevel === "pending"
      ? "pending 🟠"
      : "ongoing 🟢";
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "80%",
          textAlign: "center",
        }}
      >
        Your pet's activity tracking is {trackingStatus}
      </Typography>

      <Card sx={{ width: "80%", marginTop: 2, backgroundColor: "lightgrey" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MonitorHeartOutlined />
          <div>
            <Typography variant="h6">Heart Rate</Typography>
            <Typography variant="h4" fontWeight="bold">
              {petActivityData.heartRate}
            </Typography>
          </div>
        </div>
      </Card>
      <Card sx={{ width: "80%", marginTop: 2, backgroundColor: "lightgrey" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThermostatOutlined />
          <div>
            <Typography variant="h6">Temperature</Typography>
            <Typography variant="h4" fontWeight="bold">
              {petActivityData.temperature}
            </Typography>
          </div>
        </div>
      </Card>
      <Card sx={{ width: "80%", marginTop: 2, backgroundColor: "lightgrey" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <BoltOutlined />
          <div>
            <Typography variant="h6">Activity Level</Typography>
            <Typography variant="h4" fontWeight="bold">
              {petActivityData.activityLevel}
            </Typography>
          </div>
        </div>
      </Card>
    </Container>
  );
}
