import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useTheme } from '@emotion/react';

const ProductCard = ({ product, onAddToCart }) => {
  const theme = useTheme();

  return (
    <Card
      className="custom-product-card"
      sx={{
        backgroundColor: theme.palette.grey[300],
        boxShadow: theme.shadows[3],
        '--theme-border-radius': theme.shape.borderRadius + 'px',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent className="custom-card-content-product-card">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="custom-typography-h6-product-card"
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="custom-typography-body2-product-card"
        >
          ${product.price}
        </Typography>
        <Button variant="contained" size="small" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
