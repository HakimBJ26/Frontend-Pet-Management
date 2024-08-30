import {
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import PetActivityCards from "../../components/PetActivityCards";
import WebSocketService from "../../service/WebSocketService";
import { ACTIVITY_CANAL } from "../../common/configuration/constants/webSocketSub";
import petDataService from "../../service/PetDataService";
import { PetContext } from "../../context/PetContext"; 
import StepsChart from "../../components/StepsChart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActivityTracker() {
  const { selectedPetId } = useContext(PetContext); 
  const [userId] = useState(localStorage.getItem("id"));
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [trackingEnded, setTrackingEnded] = useState(false);
  const [activityService, setActivityService] = useState(null);

  const [petActivityData, setPetActivityData] = useState({
    petId: selectedPetId,
    heartRate: "pending",
    timeSpentInActivity: "pending",
    averageBurn: "pending",
    healthScore: "pending",
  });

  const handlePauseTracking = () => {
    if (!activityService) {
      console.warn("Vital signs service is not initialized.");
      return;
    }

    setTrackingPaused(!trackingPaused);
    if (trackingPaused) {
      activityService.connect((data) => {
        if (data.petId.toString() === selectedPetId) {
          setPetActivityData(data);
        }
      });
      toast.info("Tracking resumed.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      activityService.close();
      toast.info("Tracking paused.", {
        position: "bottom-right",
        autoClose: 3000,
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
      petId: selectedPetId,
      heartRate: "pending",
      timeSpentInActivity: "pending",
      averageBurn: "pending",
      healthScore: "pending",
    });
    toast.error("Tracking ended.", {
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  useEffect(() => {
   
    const fetchActivityData = async () => {
      try {
        const res = await petDataService.getVitalSigns(selectedPetId);
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
    setPetActivityData({
      petId: selectedPetId,
      heartRate: "pending",
      timeSpentInActivity: "pending",
      averageBurn: "pending",
      healthScore: "pending",
    })
    
    service.connect((data) => {
      if (data.petId.toString() === selectedPetId) {
        setPetActivityData(data);
      }
    });

    return () => {
      service.close();
    };
  }, [userId, selectedPetId]);

  return (
    <>
      <ToastContainer />
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
              selectedPetId={selectedPetId}
            />
          </Grid>
          <Grid item xs={12}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom:7
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
    </>
  );
}

export default ActivityTracker;
