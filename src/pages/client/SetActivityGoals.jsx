import React, { useState, useEffect, useContext } from "react";
import { Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import { tokens } from '../../theme';
import petDataService from "../../service/PetDataService";
import petService from "../../service/PetService";
import { PetContext } from "../../context/PetContext";
import SetActivityGoalsSkeleton from "../../components/skeleton/SetActivityGoalsSkeleton";
import useToast from "../../hooks/useToast";
import { ERROR_CREATE_HEALTH_GOAL_TOAST, ERROR_UPDATE_HEALTH_GOAL_TOAST, SUCCESS_CREATE_HEALTH_GOAL_TOAST, SUCCESS_UPDATE_HEALTH_GOAL_TOAST } from "../../common/configuration/constants/ToastConfig";

function SetActivityGoals() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [pet, setPet] = useState(null);
  const { showToast } = useToast();
  const [petGoal, setPetGoal] = useState({
    currentWeight: '',
    healthGoal: '',
    dailyExerciseRoutine: ''
  });
  const [loading, setLoading] = useState(true);
  const { selectedPetId } = useContext(PetContext);

  const colors = tokens();

  useEffect(() => {
    setLoading(true)
    const fetchPet = async () => {
      try {
        const res = await petService.getPetProfile(selectedPetId);
        setPet(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, [selectedPetId]);

  useEffect(() => {
    const fetchPetGoal = async () => {
      try {
        const response = await petDataService.getPetGoal(selectedPetId);
        if (response) {
          setPetGoal(response);
        }
      } catch (err) {
        console.log(err);
        setPetGoal({
          currentWeight: '',
          healthGoal: '',
          dailyExerciseRoutine: ''
        });
      } finally {
       setTimeout(()=>{
        setLoading(false);
       },1000)
      }
    };
    fetchPetGoal();
  }, [selectedPetId]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const goalData = {
        petId: selectedPetId,
        currentWeight: petGoal.currentWeight || 0,
        healthGoal: petGoal.healthGoal || '',
        dailyExerciseRoutine: petGoal.dailyExerciseRoutine || '',
      };
      if (petGoal.id) {
        await petDataService.UpdatePetGoal(petGoal.id, goalData);
        setPetGoal(petGoal)
        showToast(SUCCESS_UPDATE_HEALTH_GOAL_TOAST);
      } else {
        await petDataService.setPetGoal(goalData);
        setPetGoal(petGoal)
        showToast(SUCCESS_CREATE_HEALTH_GOAL_TOAST);
      }

      handleCloseDialog();
    } catch (err) {
      console.log(err);
       petGoal.id ?   showToast(ERROR_UPDATE_HEALTH_GOAL_TOAST) : showToast(ERROR_CREATE_HEALTH_GOAL_TOAST);

      
    }
  };

  if (loading) {
    return <SetActivityGoalsSkeleton/>
  }

  return (
    <Box marginTop={10} alignItems="center" p={2}>
      <Card sx={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
        <Box sx={{ p: 2, position: 'relative' }}>
          <Typography variant="h6" textAlign="center">
            Pet Health Goals
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" mt={2} flexDirection="column">
            <Avatar src={pet?.imageUrl} alt={pet?.name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '8px' }} />
            <Typography variant="h6" fontWeight='bold'>{pet?.name}</Typography>
            <Typography variant="body2" color="textSecondary">{pet?.breed}</Typography>
            <Typography variant="body2" color="textSecondary">{`Age: ${pet?.age}`}</Typography>
          </Box>

          <IconButton
            onClick={handleOpenDialog}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            {petGoal.id ? <UpdateIcon /> : <AddIcon />}
          </IconButton>
        </Box>
        <CardContent sx={{ backgroundColor: colors.grey[700] }}>
          <Typography variant="body1" textAlign="center" gutterBottom>
            The goal for your pet's health.
          </Typography>
          {petGoal.id ? (
            <>
              <Typography variant="body1" textAlign="center">
                <strong>Current Weight:</strong> {petGoal.currentWeight} kg
              </Typography>
              <Typography variant="body1" textAlign="center">
                <strong>Health Goal:</strong> {petGoal.healthGoal}
              </Typography>
              <Typography variant="body1" textAlign="center">
                <strong>Daily Exercise Routine:</strong> {petGoal.dailyExerciseRoutine}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" textAlign="center">
              No health goal set yet.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{petGoal.id ? "Update Pet Goal" : "Add Pet Goal"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Weight"
            type="number"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={petGoal.currentWeight}
            onChange={(e) => setPetGoal(prev => ({ ...prev, currentWeight: e.target.value }))}
          />
          <TextField
            label="Health Goal"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={petGoal.healthGoal}
            onChange={(e) => setPetGoal(prev => ({ ...prev, healthGoal: e.target.value }))}
          />
          <TextField
            label="Daily Exercise Routine"
            fullWidth
            value={petGoal.dailyExerciseRoutine}
            onChange={(e) => setPetGoal(prev => ({ ...prev, dailyExerciseRoutine: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {petGoal.id ? "Update Goal" : "Add Goal"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SetActivityGoals;
