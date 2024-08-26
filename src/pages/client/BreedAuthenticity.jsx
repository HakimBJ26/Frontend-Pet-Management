import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Modal, TextField, Box, Avatar } from "@mui/material";
import PetService from "../../service/PetService";
import { PetContext } from "../../context/PetContext";
import useToast from "../../hooks/useToast";
import { ERROR_REQUEST_CERTIF_TOAST, SUCCESS_REQUEST_CERTIF_TOAST } from "../../common/configuration/constants/ToastConfig";
import QRCode from 'qrcode.react';

function BreedAuthenticity() {
  const { selectedPetId } = useContext(PetContext);

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
        setBirthDate(res.birthDate);
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
      const response = await PetService.requestBreedCertif(selectedPetId, birthDate);
      if (response) {
        showToast(SUCCESS_REQUEST_CERTIF_TOAST);
        setOpenModal(false);
        setPet((prevPet) => ({ ...prevPet, requestCertif: true }));
      }
    } catch (err) {
      showToast(ERROR_REQUEST_CERTIF_TOAST);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Breed Authenticity</h2>
      {certifData && (
        <Box sx={{ mb: 4, p: 2, borderRadius: 2 }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4, backgroundColor: "white", borderRadius: 2, maxWidth: 400, margin: "auto", mt: 4 }}>
          <Typography variant="h6">Request Breed Certificate</Typography>
          <TextField 
            label="Birth Date" 
            type="date" 
            value={birthDate} 
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
