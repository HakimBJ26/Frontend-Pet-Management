import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const PetAccessoryCard = ({ product, onUpdate, onDelete }) => {
  return (
    <Card sx={{ display: 'flex', width: '100%', maxWidth: 600, position: 'relative', padding: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover' }}
        image={product.img}
        alt={product.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 2 }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h5" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'absolute', top: 8, right: 8 }}>
        <Button variant="contained" color="primary" sx={{ mb: 1 }} onClick={() => onUpdate(product)}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default PetAccessoryCard;
