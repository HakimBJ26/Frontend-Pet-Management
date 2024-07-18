import React, { useState } from "react";
import { Avatar, Button, TextField, Typography, Box } from "@mui/material";

const UpdateProfileForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.profileData.name || "",
    email: props.profileData.email || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
   /*   const token = localStorage.getItem("token");
      if (token) {
        await UserService.updateUserProfile(token, formData);
        props.setProfileData(formData);
        props.handleClose();
      } */
    } catch (error) {
      console.error("Error updating profile:", error);
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
          AC
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Ok{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileForm;
