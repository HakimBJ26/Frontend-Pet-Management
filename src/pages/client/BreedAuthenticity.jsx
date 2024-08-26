import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Modal, TextField, Box, Avatar, useTheme } from "@mui/material";
import PetService from "../../service/PetService";
import { PetContext } from "../../context/PetContext";
import useToast from "../../hooks/useToast";
import { ERROR_REQUEST_CERTIF_TOAST, SUCCESS_REQUEST_CERTIF_TOAST } from "../../common/configuration/constants/ToastConfig";
import QRCode from 'qrcode.react';
import '../../styles/BreedAuthenticity.css'

function BreedAuthenticity() {
  const { selectedPetId } = useContext(PetContext);
const theme= useTheme()
  const [pet, setPet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [certifData, setCertifData] = useState(null); 
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await PetService.getPetProfile(selectedPetId);
        setPet(res);
        setCertifData(null)
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, [selectedPetId]);

  const handleRequestCert = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleVerifyCert = async () => {
    try {
      const response = await PetService.verifyCertif(selectedPetId);
      if (response.exists) {
        setCertifData(response); 
        showToast(SUCCESS_REQUEST_CERTIF_TOAST);
      } else {
        showToast(ERROR_REQUEST_CERTIF_TOAST);
      }
    } catch (err) {
      showToast(ERROR_REQUEST_CERTIF_TOAST);
    }
  };

  const handleSubmitRequest = async () => {
    try {
    if(birthDate){
      const response = await PetService.requestBreedCertif(selectedPetId, birthDate);
      if (response) {
        showToast(SUCCESS_REQUEST_CERTIF_TOAST);
        setOpenModal(false);
        setPet((prevPet) => ({ ...prevPet, requestCertif: true }));
      }
    }
    } catch (err) {
      showToast(ERROR_REQUEST_CERTIF_TOAST);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Breed Authenticity</h2>
      {certifData && (
        <Box sx={{ mb:-4, p: 2, borderRadius: 2 }}>
          <Typography variant="h6">Certificate Details</Typography>
          <Typography variant="body1"><strong>Pet Name:</strong> {certifData.petName}</Typography>
          <Typography variant="body1"><strong>Breed:</strong> {certifData.breed}</Typography>
          <Typography variant="body1"><strong>Birth Date:</strong> {certifData.birthDate}</Typography>
          <Typography variant="body1"><strong>Unique ID:</strong> {certifData.uniqueId}</Typography>
          <QRCode value={JSON.stringify(certifData)} /> 
        </Box>
      )}
      {pet && (
        <Card sx={{ maxWidth: 300, margin: "auto", mt: 4 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Avatar 
              src={pet.imageUrl} 
              alt={pet.name} 
              style={{ width: 100, height: 100, borderRadius: "50%" }} 
            />
            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
              {pet.name}
            </Typography>

            {pet.blockchainCert ? (
             <>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleVerifyCert}>
                Verify Certificate
              </Button>
              {certifData &&  (<Typography marginTop={1}>Certificate verified! ✅</Typography>)}
             </>
            ) : (
              pet.requestCertif ? (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Your certificate request is already being processed.
                </Typography>
              ) : (
                <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleRequestCert}>
                  <Typography fontWeight='bold'>
                    Request a Certif
                  </Typography>
                </Button>
              )
            )}
          </CardContent>
        </Card>
      )}

<Modal open={openModal} onClose={handleModalClose}>
  <Box
  className="submitRequestModel"
    sx={{
      backgroundColor: `${theme.palette.grey[500]}`
    }}
  >
    <Typography variant="h6">Request Breed Certificate</Typography>
    <Typography variant="h6" fontWeight='bold'>if you are not sure about those informations you can modify it from the pet profile screen and resubmit</Typography>
    <TextField
      label="Pet Name"
      value={pet?.name}
      InputProps={{
        readOnly: true,
      }}
      variant="filled"
    />
    <TextField
      label="Breed"
      value={pet?.breed} 
      InputProps={{
        readOnly: true,
      }}
      variant="filled"
    />
    <TextField
      label="Birth Date"
      type="date"
      value={birthDate ? birthDate : ""}
      onChange={(e) => setBirthDate(e.target.value)}
      InputLabelProps={{ shrink: true }}
      required
    />
    <Button variant="contained" color="primary" onClick={handleSubmitRequest}>
      Submit Request
    </Button>
  </Box>
</Modal>

    </div>
  );
}

export default BreedAuthenticity;
