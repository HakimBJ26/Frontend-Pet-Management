import { useState } from "react";
import { Avatar, Button, TextField, Typography, Box } from "@mui/material";
import UserService from "../../service/UserService";
import Loader from "../../Loading/Loader";

const UpdateProfileForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.profileData.name || "",
    city: props.profileData.city || "",
    phone: props.profileData.phone || "",
  });


  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await UserService.updateUserProfile(formData);
      props.setProfileData(formData);
      props.handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(true);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>

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
          {formData.name ? formData.name.charAt(0) : "U"}
        </Avatar>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <Loader size={24} color="#ffffff" /> : <span>Save</span>}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileForm;
