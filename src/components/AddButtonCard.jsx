import { Card, CardContent, CardActions, Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButtonCard = ({ onAdd }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5">Add New Product</Typography>
        </Box>
        <CardActions>
          <Button variant="contained" color="primary" onClick={onAdd}>
            Add
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default AddButtonCard;
