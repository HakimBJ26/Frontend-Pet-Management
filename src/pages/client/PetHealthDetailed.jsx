import { Box, CardMedia, Divider, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import petIcon from "../../images/petIcon.png";
import VetAppointments from "../../components/VetAppontment";
import petDataService from "../../service/PetDataService";
import NutritionBarChart from "../../components/HealthStatsChart";
import "../../styles/VetAppointments.css";
import VetAppointmentsSkeleton from "../../components/skeleton/vetAppointmentsSkeleton";
import HealthStatsSkeleton from "../../components/skeleton/HealthStatsSkeleton";

function PetHealthDetailed() {
  const location = useLocation();
  const { petData } = location.state || {};
  const [VetAppointmentsData, setVetAppointmentsData] = useState(null);
  const [petGoal, setPetGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVetAppointements = async () => {
      try {
        const response = await petDataService.getVetAppointment(petData.id);
        setVetAppointmentsData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVetAppointements();
  }, [petData.id]);

  useEffect(() => {
    const fetchPetGoal = async () => {
      try {
        const response = await petDataService.getPetGoal(petData.id);
        setPetGoal(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPetGoal();
    setTimeout(()=>{
      setLoading(false);
    },1000)
  }, [petData.id]);

  return (
    <Box sx={{ paddingX: 1, marginTop: 10 }}>
      <Box className="countainer">
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <CardMedia
            component="img"
            image={petIcon}
            alt={petData?.name}
            sx={{
              height: "50px",
              width: "50px",
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {petData?.name} the {petData?.breed}
            </Typography>
            <Typography variant="h5">{petData?.age} years old</Typography>
          </Box>
        </Box>
        <Divider sx={{ marginTop: 1, height: '2px' }} />
        <Typography variant="h5">
          Breed: {petData?.breed}
        </Typography>

        <Box sx={{ display: 'grid', justifyContent: 'space-around', gridTemplateColumns: '1fr 1fr' }}>
          <Box>
            <Typography variant="h6">Current weight</Typography>
            <Typography variant="h6">Health Goal</Typography>
            <Typography variant="h6">Daily exercise routine</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
            {loading ? (
              <>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight="bold">{petGoal?.currentWeight} kg</Typography>
                <Typography variant="h5" fontWeight="bold">{petGoal?.healthGoal}</Typography>
                <Typography variant="h5" fontWeight="bold">{petGoal?.dailyExerciseRoutine}</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {loading ? (
        <VetAppointmentsSkeleton/>
      ) : (
        <VetAppointments appointmentsData={VetAppointmentsData} />
      )}
      {loading ? (
        <HealthStatsSkeleton/>
      ) : (
        <NutritionBarChart petID={petData.id} />
      )}
    </Box>
  );
}

export default PetHealthDetailed;
