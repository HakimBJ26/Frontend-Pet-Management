import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import PetActivityCards from "../../components/PetActivityCards";
import WebSocketService from "../../service/WebSocketService";
import { ACTIVITY_CANAL } from "../../common/configuration/constants/webSocketSub";
import petDataService from "../../service/PetDataService";
import { useSearchParams } from "react-router-dom";
import PetService from "../../service/PetService";
import StepsChart from "../../components/StepsChart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActivityTracker() {
  const [userId] = useState(localStorage.getItem("id"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [petsData, setPetsData] = useState([]);
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [trackingEnded, setTrackingEnded] = useState(false);
  const petId = searchParams.get("petId");
  const [activityService, setActivityService] = useState(null);

  const [petActivityData, setPetActivityData] = useState({
    petId: petId,
    heartRate: "pending",
    timeSpentInActivity: "pending",
    averageBurn: "pending",
    healthScore: "pending",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await PetService.getCurrentUserPets();
        setPetsData(response);
      } catch (error) {
        console.error("Error fetching pet profile:", error);
      }
    };
    fetchPets();
  }, []);

  const handlePauseTracking = () => {
    if (!activityService) {
      console.warn("Vital signs service is not initialized.");
      return;
    }

    setTrackingPaused(!trackingPaused);
    if (trackingPaused) {
      activityService.connect((data) => {
        if (data.petId.toString() === petId) {
          setPetActivityData(data);
        }
      });
      toast.info("Tracking resumed.", {
        position: "bottom-right", // Use string for position
        autoClose: 5000, // Auto-close after 5 seconds
      });
    } else {
      activityService.close();
      toast.info("Tracking paused.", {
        position: "bottom-right", // Use string for position
        autoClose: 5000, // Auto-close after 5 seconds
      });
    }
  };

  const handleEndTracking = () => {
    if (!activityService) {
      console.warn("Vital signs service is not initialized.");
      return;
    }

    setTrackingEnded(true);
    activityService.close();
    setPetActivityData({
      petId: petId,
      heartRate: "pending",
      timeSpentInActivity: "pending",
      averageBurn: "pending",
      healthScore: "pending",
    });
    toast.error("Tracking ended.", {
      position: "bottom-left", // Use string for position
      autoClose: 3000, // Auto-close after 3 seconds
    });
  };

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await petDataService.getVitalSigns(petId);
        setPetActivityData(res);
      } catch (err) {
        console.error("Error fetching activity data:", err);
      }
    };

    const service = new WebSocketService(
      ACTIVITY_CANAL,
      userId,
      fetchActivityData
    );

    setActivityService(service);

    service.connect((data) => {
      if (data.petId.toString() === petId) {
        setPetActivityData(data);
      }
    });

    return () => {
      service.close();
    };
  }, [userId, petId]);

  return (
    <>
      <ToastContainer />
      {petId === null ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              marginTop: 10,
            }}
          >
            Please select a pet to track activity
          </Typography>
          {petsData.map((p) => (
            <Card key={p.id} sx={{ mt: 1, width: "200px", overflowX: "auto" }}>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                onClick={() => {
                  setSearchParams({ petId: p.id });
                }}
              >
                <Avatar
                  src={
                    p.image
                      ? `data:image/jpeg;base64,${p.image}`
                      : "/placeholder-pet.jpg"
                  }
                  sx={{
                    width: 80,
                    height: 80,
                    border: "4px solid",
                    borderColor: "background.default",
                  }}
                >
                  {p.name ? p.name[0] : "?"}
                </Avatar>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Name
                  </Typography>
                  <Typography variant="body2">{p.name}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Breed
                  </Typography>
                  <Typography variant="body2">{p.breed}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Container
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Calories Expenditure
              </Typography>
              <PetActivityCards
                petActivityData={petActivityData}
                trackingPaused={trackingPaused}
                trackingEnded={trackingEnded}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Activity Intensity
              </Typography>
              <StepsChart
                petActivityData={petActivityData}
                trackingEnded={trackingEnded}
              />
            </Grid>
            <Grid item xs={12}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    marginBottom: 1,
                    borderColor: "black",
                    borderRadius: "12px",
                    "&:hover": {
                      borderColor: "black",
                    },
                  }}
                  onClick={handlePauseTracking}
                  disabled={trackingEnded}
                >
                  {trackingPaused ? "Resume" : "Pause"} tracking
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: "black",
                    borderRadius: "12px",
                    "&:hover": {
                      borderColor: "black",
                    },
                  }}
                  onClick={handleEndTracking}
                  disabled={trackingEnded}
                >
                  End tracking
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default ActivityTracker;
