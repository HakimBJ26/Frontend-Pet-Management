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
import ActivityIntensity from "../../components/ActivityIntensity";
import WebSocketService from "../../service/WebSocketService";
import { VITAL_SIGNS_CANAL } from "../../common/configuration/constants/webSocketSub";
import petDataService from "../../service/PetDataService";
import { useSearchParams } from "react-router-dom";
import PetService from "../../service/PetService";

function ActivityTracker() {
  const [userId] = useState(localStorage.getItem("id"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [petsData, setPetsData] = useState([]);
  const petId = searchParams.get("petId");

  const [petActivityData, setPetActivityData] = useState({
    petId: petId,
    heartRate: "pending",
    temperature: "pending",
    activityLevel: "pending",
  });

  const [activityIntensityData, setActivityIntensityData] = useState(null);

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

  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        const res = await petDataService.getVitalSigns(petId);
        setPetActivityData(res);
      } catch (err) {
        console.log("Error fetching vital signs data:", err);
      }
    };

    const vitalSignsService = new WebSocketService(
      VITAL_SIGNS_CANAL,
      userId,
      fetchVitalSigns
    );

    vitalSignsService.connect((data) => {
      data.petId.toString() === petId && setPetActivityData(data);
    });
  }, [userId]);

  return (
    <>
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
              <PetActivityCards petActivityData={petActivityData} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Activity Intensity
              </Typography>
              <ActivityIntensity
                activityIntensityData={activityIntensityData}
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
                  }}
                >
                  Pause tracking
                </Button>
                <Button variant="outlined" color="primary">
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
