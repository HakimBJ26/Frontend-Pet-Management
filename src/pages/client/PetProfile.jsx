import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import UserService from "../../service/UserService";

export default function UserProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

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

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Pet Profile
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
            <Button variant="outlined">Edit</Button>
            <Button variant="outlined">Add Photo</Button>
            <Button variant="outlined">Health Passport</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
