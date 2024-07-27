import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useTheme } from '@emotion/react';

const ProductCard = ({ product ,onAddToCart}) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                width: 150, 
                height: 250, 
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.grey,
                boxShadow: theme.shadows[3],
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden', 
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'calc(100% - 140px)',
                    overflow: 'hidden',
                    padding: '8px',
                }}
            >
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                    }}
                >
                    {product.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem', 
                    }}
                >
                    {product.price}
                </Typography>
                <Button variant="contained" size="small" onClick={onAddToCart}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
