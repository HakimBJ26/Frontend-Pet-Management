import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PetService from "../../service/PetService";
import { toast } from "sonner";
import "../../styles/HealthAlerts.css";
import AddIcon from "@mui/icons-material/Add";
import {
  CLIENT_DASH_PATH,
  DETAILED_HEALTH_PET,
} from "../../common/configuration/constants/Paths";
import { useNavigate } from "react-router-dom";
import UpdateImageModal from "../../components/model/UpdatePetImageModal";
const breedOptions = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Dachshund",
  "Boxer",
  "Siamese Cat",
  "Persian Cat",
  "Maine Coon",
  "Bengal Cat",
  "Sphynx Cat",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "French Bulldog",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Ferret",
  "Parrot",
  "Canary",
  "Other",
];


export default function PetProfile() {
  const [petData, setPetData] = useState([]);
  const [filteredPetData, setFilteredPetData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pageEndRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPetId, setEditPetId] = useState(null);
  const [newPetData, setNewPetData] = useState({
    name: "",
    breed: "",
    age: "",
  });

  const navigate = useNavigate();
  const [isOtherBreed, setIsOtherBreed] = useState(false);
  const [otherBreed, setOtherBreed] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (id) => {
    setEditPetId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await PetService.getCurrentUserPets();
        console.log(response)
        setPetData(response);
        setFilteredPetData(response);
      } catch (error) {
        console.error("Error fetching pet profile:", error);
      }
    };
    fetchPetProfile();
  }, [open]);
  useEffect(() => {
    const filteredPets = petData?.filter((pet) => {
      return (
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.age.toString().includes(searchTerm)
      );
    });
    setFilteredPetData(filteredPets);
  }, [searchTerm, petData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetData({ ...newPetData, [name]: value });
  };

  const handleOpen = (pet = null) => {
    if (pet) {
      setIsEditMode(true);
      setEditPetId(pet.id);
      setNewPetData({ name: pet.name, breed: pet.breed, age: pet.age });
      setIsOtherBreed(pet.breed === "Other");
      setOtherBreed(pet.breed === "Other" ? pet.breed : "");
    } else {
      setIsEditMode(false);
      setNewPetData({ name: "", breed: "", age: "" });
      setIsOtherBreed(false);
      setOtherBreed("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPetData({ name: "", breed: "", age: "" });
    setIsOtherBreed(false);
    setOtherBreed("");
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setNewPetData({ ...newPetData, age: value });
  };
  const handleBreedChange = (e) => {
    const value = e.target.value;
    setNewPetData({ ...newPetData, breed: value });
    setIsOtherBreed(value === "Other");
  };
  const handleOtherBreedChange = (e) => {
    const value = e.target.value;
    setOtherBreed(value);
    setNewPetData({ ...newPetData, breed: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPetData.name || !newPetData.breed || !newPetData.age) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      if (isEditMode) {
        await PetService.updatePet(editPetId, newPetData);
        toast.success("Pet updated successfully.");
        setPetData(
          petData.map((pet) =>
            pet.id === editPetId ? { ...newPetData, id: editPetId } : pet
          )
        );
      } else {
        await PetService.addPet(newPetData);
        toast.success("Pet added successfully.");
        setPetData([...petData, { ...newPetData, id: Date.now() }]);
        requestAnimationFrame(() => {
          pageEndRef.current.scrollIntoView({ behavior: "smooth" });
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error adding/updating pet:", error);
    }
  };
  const handleCartClick = (pet) => {
    navigate(`${CLIENT_DASH_PATH}${DETAILED_HEALTH_PET}`, {
      state: { petData: pet },
    });
  };

  return (
    <Container sx={{ mt: 7 }}>
      <Box className="health-alerts-container">
        <Typography variant="h5" gutterBottom>
          Pet Profile
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Find your Pet"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="medium" 
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="health-alerts-container">
        <Box sx={{ display: "flex", mt: 1, justifyContent: "center" }}>
          <Card sx={{ mx: "auto" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen()}
                  sx={{ mb: 13 }}
                >
                  Add Pet
                </Button>
                <AddIcon sx={{ fontSize: 70 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {filteredPetData?.map((p) => (
          <Card key={p.id} sx={{ mt: 1, minWidth: "300px", overflowX: "auto" }}>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
              onClick={() => handleCartClick(p)}
            >
              <Avatar
                src={p.imageUrl}
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
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Breed
                </Typography>
                <Typography variant="body2">{p.breed}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Age
                </Typography>
                <Typography variant="body2">{p.age}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button variant="outlined" onClick={() => handleOpen(p)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleOpenModal(p.id);
                  }}
                >
                  Update Pet Image
                </Button>

                <Button variant="outlined">Health Passport</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
        <UpdateImageModal
          open={modalOpen}
          onClose={handleCloseModal}
          id={editPetId}
          folder='pet'
        />
      </Box>
      <div ref={pageEndRef} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? "Edit Pet" : "Add New Pet"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Pet Name"
              fullWidth
              variant="outlined"
              value={newPetData.name}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="breed-select-label">Breed</InputLabel>
              <Select
                labelId="breed-select-label"
                name="breed"
                value={newPetData.breed}
                onChange={handleBreedChange}
                label="Breed"
              >
                {breedOptions.map((breed, index) => (
                  <MenuItem key={index} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isOtherBreed && (
              <TextField
                margin="dense"
                name="otherBreed"
                label="Other Breed"
                fullWidth
                variant="outlined"
                value={otherBreed}
                onChange={handleOtherBreedChange}
              />
            )}
            <FormControl fullWidth margin="dense">
              <InputLabel id="age-select-label">Age</InputLabel>
              <Select
                labelId="age-select-label"
                name="age"
                value={newPetData.age}
                onChange={handleAgeChange}
                label="Age"
              >
                {Array.from({ length: 71 }, (_, index) => (
                  <MenuItem key={index} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditMode ? "Update Pet" : "Add Pet"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
