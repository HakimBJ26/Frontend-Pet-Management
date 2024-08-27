import React, { useEffect, useState } from "react";
import petDataService from "../../service/PetDataService";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddActivityModal from "../../components/model/AddActivityModal";

function AddActivityProposition() {
  const [currentActivities, setCurrentActivities] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await petDataService.getActivityPropositions();
        setCurrentActivities(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchActivities();
  }, []);

  function handleAddActivity(activity) {
    currentActivities.push(activity);
  }

  const handleDelete = async () => {
    try {
      await petDataService.deleteActivityProposition(selectedActivityId);
      setCurrentActivities(
        currentActivities.filter(
          (activity) => activity.id !== selectedActivityId
        )
      );
      setOpenDeleteModal(false);
    } catch (err) {
      console.error("Error deleting activity:", err);
    }
  };

  function handleCloseModel() {
    setOpenAddModal(false);
  }

  return (
    <Container sx={{ marginTop: "80px", width: "60%" }}>
      <Typography variant="h4" gutterBottom  fontWeight='bold'>
        Activity Propositions
      </Typography>
      <Typography variant="h6" marginBottom={5}  >
        Manage activity Propositions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddModal(true)}
                >
                  Add Activity
                </Button>
              </TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentActivities?.length === 0 && (
              <TableRow><Typography variant="h4" padding={2} textAlign='center'>
                 no activities to show ..
                </Typography></TableRow>
            )}
            {currentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.duration} minutes</TableCell>
                <TableCell>{activity.frequency}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setSelectedActivityId(activity.id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddActivityModal
        handleClose={handleCloseModel}
        open={openAddModal}
        onAddActivity={handleAddActivity}
      />

      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Delete Activity
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AddActivityProposition;
