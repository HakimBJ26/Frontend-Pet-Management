import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import PetService from '../../service/PetService';
import useToast from "../../hooks/useToast";
import { ERROR_DECLINE_CERTIF_TOAST, ERROR_REQUEST_CERTIF_TOAST, SUCCESS_DECLINE_CERTIF_TOAST, SUCCESS_REQUEST_CERTIF_TOAST } from "../../common/configuration/constants/ToastConfig";
import '../../styles/ApproveCertif.css'

function ApproveCertif() {
  const [certifRequests, setCertifRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchCertifRequests = async () => {
      try {
        const data = await PetService.getCertifRequests();
        setCertifRequests(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching certification requests:", err);
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCertifRequests();
  }, []);

  const handleApprove = async (certifData) => {
    try {
      const response = await PetService.issueCertif(certifData);
      console.log("Certification issued:", response);
      setCertifRequests((prevRequests) => prevRequests.filter(request => request.uniqueId !== certifData.uniqueId));
      showToast(SUCCESS_REQUEST_CERTIF_TOAST);
    } catch (error) {
      console.error("Error issuing certification:", error);
      showToast(ERROR_REQUEST_CERTIF_TOAST);
    }
  };

  const handleDecline = async (certifData) => {
    try {
      await PetService.declineCertif(certifData.uniqueId);
      setCertifRequests((prevRequests) => prevRequests.filter(request => request.uniqueId !== certifData.uniqueId));
      showToast(SUCCESS_DECLINE_CERTIF_TOAST);
    } catch (error) {
      console.error("Error declining certification:", error);
      showToast(ERROR_DECLINE_CERTIF_TOAST);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching data</Typography>;

  return (
    <Box sx={{ marginTop: 10 }}>
      {certifRequests.length === 0 ? (
        <Typography variant='h4' fontWeight='bold' padding={2}>No certification requests</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {certifRequests.map((request) => (
            <Paper key={request.uniqueId}  className='petRequest'>
              <Box display="flex" alignItems="center">
                <Avatar 
                  src={request.imageUrl || '/placeholder.png'} 
                  alt={request.petName} 
                  style={{ marginRight: '16px', width: '60px', height: '60px' }}
                />
                <Box>
                  <Typography variant="h6">{request.petName}</Typography>
                  <Typography variant="body2">Breed: {request.breed}</Typography>
                  <Typography variant="body2">Birth Date: {request.birthDate}</Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleApprove(request)}
                >
                  Approve
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => handleDecline(request)}
                >
                  Decline
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ApproveCertif;
