import  { useEffect, useState } from "react";
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
import UserService from "../../service/UserService";
import UpdateProfileForm from "../../components/forms/UpdateProfileForm";
import UpdateImageModal from "../../components/model/UpdatePetImageModal";


export default function UserProfile() {
  const [profileData, setProfileData] = useState({
    id:"",
    name: "",
    email: "",
    city: "",
    phone: "",
    role: "",
  });
  const [open, setOpen] = useState(false);
  const [addPhotoModalOpen,setAddPhotoModalOpen]=useState(false)
  const [userImageUrl,setImageUrl]=useState('')
  const userId=localStorage.getItem('id')
  const fetchUserImg= async()=>{
    try{
     const res = await UserService.getUserImage(userId)  
     setImageUrl(res) 
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await UserService.getUserProfile();
        setProfileData({
          id:response.id,
          name: response.name,
          email: response.email,
          city: response.city,
          phone: response.phone,
          role: response.role,
        });
        fetchUserImg()
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseAddPhotoModal = ()=>setAddPhotoModalOpen(false)

  const addPhoto=()=>{
    setAddPhotoModalOpen(true)
  }

  return (
    <Box sx={{ mt: 10}}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
      </Box>
      <Card sx={{ maxWidth: 345, mx: "auto", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Avatar
                src={userImageUrl}
                sx={{
                  width: 80,
                  height: 80,
                  border: "4px solid",
                }}
              >
            {profileData.name ? profileData.name.charAt(0) : "U"}
          </Avatar>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
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
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                City
              </Typography>
              <Typography variant="body2">{profileData.city}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone
              </Typography>
              <Typography variant="body2">{profileData.phone}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Role
              </Typography>
              <Typography variant="body2">{profileData.role}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="outlined" onClick={handleOpen}>
                Edit
              </Button>
              <Button variant="contained" onClick={addPhoto}>
                add photo
              </Button>
              <UpdateImageModal
          open={addPhotoModalOpen}
          onClose={handleCloseAddPhotoModal}
          id={userId}
          folder='user'
        />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Edit Profile</DialogTitle>
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
