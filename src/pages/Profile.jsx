import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import UserService from "../service/UserService";
import StyledBox from "../components/StyledBox/StyledBox"; // Assurez-vous que le chemin est correct
import Avatar from "@mui/material/Avatar";
import PetsIcon from "@mui/icons-material/Pets";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await UserService.getUserProfile(token);
          const userData = response.ourUsers; // Assuming 'ourUsers' is the object containing profile data
          setProfileData({
            firstName: userData.name,
            lastName: userData.lastName,
            email: userData.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update user profile data in backend
    // Example: fetch('api/user/profile', { method: 'POST', body: JSON.stringify(profileData) })
  };

  return (
    <StyledBox>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PetsIcon />
      </Avatar>
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="fname"
              autoFocus
              value={profileData.firstName}
              onChange={handleChange}
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={profileData.lastName}
              onChange={handleChange}
              className={classes.textField}
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
              value={profileData.email}
              onChange={handleChange}
              className={classes.textField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Profile
            </Button>
          </form>
        </div>
      </Container>
    </StyledBox>
  );
};

export default Profile;
