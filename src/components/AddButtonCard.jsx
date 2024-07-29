import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const AddButtonCard = ({ onAdd }) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: 600,
        justifyContent: "center",
        alignItems: "center",
        height: 140,
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <AddIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5">Add New Product</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
};
export default AddButtonCard;
