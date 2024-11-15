import { Container, Grid, Typography } from '@mui/material';
import VitalSigns from '../../components/VitalSigns';
import HealthAlerts from '../../components/HealthAlerts';
import Overview from '../../components/Overview';
import { useEffect, useContext, useState } from 'react';
import petDataService from '../../service/PetDataService';
import AlertsService from '../../service/AlertsService';
import WebSocketService from '../../service/WebSocketService';
import { VITAL_SIGNS_CANAL } from '../../common/configuration/constants/webSocketSub';
import { PetContext } from '../../context/PetContext';  
import VitalSignsSkeleton from '../../components/skeleton/VitalSignsSkeleton';
import OverviewSkeleton from '../../components/skeleton/OverviewSkeleton';
import HealthAlertsSkeleton from '../../components/skeleton/HealthAlertsSkeleton';

function HealthMonitor() {
  const userId = localStorage.getItem('id');
  const { selectedPetId } = useContext(PetContext);  

  const [vitalSignsData, setVitalSignsData] = useState({});
  const [healthAlerts, setHealthAlerts] = useState([]);
  const [overview, setOverview] = useState({});
  const [isLoading,setLoading]=useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchVitalSigns = async () => {
      try {
        const res = await petDataService.getVitalSigns(selectedPetId);
        setVitalSignsData(res);
      } catch (err) {
        console.log("Error fetching vital signs data:", err);
      }
    };

    fetchVitalSigns();
  }, [selectedPetId]);

  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        const res = await petDataService.getVitalSigns(selectedPetId);
        setVitalSignsData(res);
      } catch (err) {
        console.log("Error fetching vital signs data:", err);
      }
    };

    const vitalSignsService = new WebSocketService(VITAL_SIGNS_CANAL, userId, fetchVitalSigns);

    vitalSignsService.connect((data) => {
      if (data.heartRate !== undefined && data.petId === selectedPetId) {
        setVitalSignsData(data);
      }
    });

    return () => {
      vitalSignsService.close();
    };
  }, [userId, selectedPetId]);

  useEffect(() => {
    const fetchHealthAlert = async () => {
      try {
        const res = await AlertsService.getHealthAlerts(selectedPetId);
        setHealthAlerts(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHealthAlert();
  }, [selectedPetId]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await petDataService.getOverview(selectedPetId);
        setOverview(res);
      } catch (err) {
        console.log(err);
      }
      setTimeout(()=>{
        setLoading(false)
      },1000)
    };
    fetchOverview();
  }, [selectedPetId]);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight='bold' gutterBottom>Vital Signs</Typography>
         {isLoading ? <VitalSignsSkeleton/> :  <VitalSigns vitalSignsData={vitalSignsData} />}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight='bold' gutterBottom>Health Alerts</Typography>
         {isLoading? <HealthAlertsSkeleton/> :  <HealthAlerts healthAlertsData={healthAlerts} />}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight='bold' gutterBottom>Overview</Typography>
          {isLoading? <OverviewSkeleton/> : <Overview overviewData={overview} />}
        </Grid>
      </Grid>
    </Container>
  );
}
export default HealthMonitor;
