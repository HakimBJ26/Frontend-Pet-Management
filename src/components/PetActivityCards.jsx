import {
  HealthAndSafety,
  MonitorHeart,
  Pets,
  ShowChart,
} from "@mui/icons-material";
import { Card, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function PetActivityCards({
  petActivityData,
  trackingPaused,
  trackingEnded,
}) {
  const [trackingStatus, setTrackingStatus] = React.useState("pending 🟠");

  useEffect(() => {
    if (trackingPaused && !trackingEnded) {
      setTrackingStatus("paused ⏸");
    } else if (trackingEnded && !trackingPaused) {
      setTrackingStatus("ended ⏹");
    } else if (petActivityData.heartRate === "pending") {
      setTrackingStatus("pending 🟠");
    } else {
      setTrackingStatus("ongoing 🟢");
    }
  }, [trackingPaused, trackingEnded, petActivityData]);
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Your pet's activity tracking is {trackingStatus}
      </Typography>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            backgroundColor: "lightgray",
            padding: 0.5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                backgroundColor: "white",
                width: 45,
                height: 40,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MonitorHeart />
            </Container>
            <div>
              <Typography variant="h6">Heart Rate</Typography>
              <Typography variant="h4" fontWeight="bold">
                {petActivityData.heartRate}
              </Typography>
            </div>
          </div>
        </Card>
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            backgroundColor: "lightgray",
            padding: 0.5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                backgroundColor: "white",
                width: 45,
                height: 40,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HealthAndSafety />
            </Container>
            <div>
              <Typography variant="h6">Health Score</Typography>
              <Typography variant="h4" fontWeight="bold">
                {
                  // round to 2 decimal places
                  petActivityData.healthScore &&
                    Math.round(petActivityData.healthScore * 100) / 100
                }
              </Typography>
            </div>
          </div>
        </Card>
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            backgroundColor: "lightgray",
            padding: 0.5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                backgroundColor: "white",
                width: 45,
                height: 40,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShowChart />
            </Container>
            <div>
              <Typography variant="h6">Time Spent</Typography>
              <Typography variant="h4" fontWeight="bold">
                {petActivityData.timeSpentInActivity}
              </Typography>
            </div>
          </div>
        </Card>
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            backgroundColor: "lightgray",
            padding: 0.5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                backgroundColor: "white",
                width: 45,
                height: 40,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pets />
            </Container>
            <div>
              <Typography variant="h6">Avg. Burn</Typography>
              <Typography variant="h4" fontWeight="bold">
                {petActivityData.averageBurn}
              </Typography>
            </div>
          </div>
        </Card>
      </Container>
    </Container>
  );
}
