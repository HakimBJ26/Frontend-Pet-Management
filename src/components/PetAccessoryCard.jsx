import  { useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, TextField, Button } from '@mui/material';

const PetAccessoryCard = ({ product, onDelete, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const handleUpdate = () => {
    onUpdate(product.id, { name, price });
  };

  return (
    <Card className="custom-card">
      <CardMedia
        component="img"
        height="200"
        image={product.img}
        alt={product.name}
      />
      <CardContent>
        <TextField
          label="ID"
          value={product.id}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant='contained' onClick={handleUpdate}>
          Update
        </Button>
        <Button size="small" variant="contained" color="error" onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetAccessoryCard ;