import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UserService from "../service/UserService";
import UpdateProfileForm from "../components/forms/UpdateProfileForm";

export default function UserProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await UserService.getUserProfile(token);
          const userData = response.ourUsers;
          setProfileData({
            name: userData.name,
            email: userData.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 345, mx: "auto", mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Avatar
            src="/placeholder-user.jpg"
            sx={{
              width: 80,
              height: 80,
              border: "4px solid",
              borderColor: "background.default",
            }}
          >
            AC
          </Avatar>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Name
            </Typography>
            <Typography variant="body2">{profileData.name}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            <Typography variant="body2">{profileData.email}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button variant="outlined" onClick={handleOpen}>
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent>
          <UpdateProfileForm
            profileData={profileData}
            setProfileData={setProfileData}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}