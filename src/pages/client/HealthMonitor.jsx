import { Container, Grid,  Typography } from '@mui/material';
import VitalSigns from '../../components/VitalSigns';
import HealthAlerts from '../../components/HealthAlerts';
import Overview from '../../components/Overview';
import { useEffect, useState } from 'react';
import petDataService from '../../service/PetDataService';
import AlertsService from '../../service/AlertsService';

function HealthMonitor() {

  const [vitalSignsData,setVitalSignsData]=useState({
  }
  )

  const [healthAlerts,setHealthAlerts]=useState([
  ]
  
  )

  const [overview,setOverview]=useState({
    recentActivity: ['morning walk','Vet visit'],
    nextCheckUp: "26th Aug",
    healthStatus: "Poor"
  }
  )

  useEffect( ()=>{
    const fetchVitalSigns = async()=>{
     try{
      const res = await petDataService.getVitalSigns('1')
      setVitalSignsData(res)
     }catch(err){
      console.log(err)
     }

    }
  fetchVitalSigns()

  },[])

  useEffect( ()=>{
    const fetchHealthAlert = async()=>{
     try{
      const res = await AlertsService.getHealthAlerts('1')
      setHealthAlerts(res)
     }catch(err){
      console.log(err)
     }

    }
    fetchHealthAlert()

  },[])


  useEffect( ()=>{
    const fetchHOverview = async()=>{
     try{
      const res = await petDataService.getOverview('1')
      setOverview(res)
     }catch(err){
      console.log(err)
     }

    }
    fetchHOverview()

  },[])

  return (
    <Container sx={{marginTop:10}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
        <Typography variant="h4" fontWeight='bold' gutterBottom>Vital Signs</Typography>
          <VitalSigns vitalSignsData={vitalSignsData}/>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h4" fontWeight='bold' gutterBottom>Health Alerts</Typography>
          <HealthAlerts  healthAlertsData={healthAlerts}/>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h4" fontWeight='bold' gutterBottom>Overview</Typography>
          <Overview  overviewData={overview}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HealthMonitor;