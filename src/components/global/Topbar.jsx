import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Box,
} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useNavigate } from "react-router-dom";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { ColorModeContext } from "../../theme";
import { AuthContext } from "../../context/AuthContext";
import { PetContext } from "../../context/PetContext";  
import UserService from "../../service/UserService";
import { SIGN_IN_PATH } from "../../common/configuration/constants/Paths";
import { messaging } from "../../firebase";
import { deleteToken, getToken } from "firebase/messaging";
import PetService from "../../service/PetService";

function TopBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { selectedPetId, setSelectedPetId, selectedPetName, setSelectedPetName } = useContext(PetContext);  
  const [pets, setPets] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await PetService.getCurrentUserPets();
        setPets(res);
        if (res.length > 0 && !selectedPetId) {
          setSelectedPetId(res[0].id);
          setSelectedPetName(res[0].name);
          localStorage.setItem('selectedPetId', res[0].id);
          localStorage.setItem('selectedPetName', res[0].name);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPets();
  }, [selectedPetId, setSelectedPetId, setSelectedPetName]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectPet = (petId, petName) => {
    setSelectedPetId(petId); 
    setSelectedPetName(petName);  
    localStorage.setItem('selectedPetId', petId);  
    localStorage.setItem('selectedPetName', petName);
    handleMenuClose(); 
  };

  const handleLogout = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      });

      if (token) {
        await deleteToken(messaging);
      }

      await UserService.deleteMessagingToken(localStorage.getItem('id'));
      await UserService.logout();
      setCurrentUser(null);
      localStorage.removeItem('id');
      localStorage.removeItem('selectedPetId');
      localStorage.removeItem('selectedPetName');
      navigate(`${SIGN_IN_PATH}`);
    } catch (err) {
      console.error('Error during logout process:', err);
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}></Typography>
        <Box sx={{display:'flex',flexDirection:'row', alignItems:'center'}}>
          <Typography>
            {selectedPetName ? selectedPetName : 'no selected pet !'}
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {pets.map((pet) => (
              <MenuItem
                key={pet.id}
                selected={pet.id === selectedPetId}
                onClick={() => handleSelectPet(pet.id, pet.name)}
              >
                {pet.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>

        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Logout</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
