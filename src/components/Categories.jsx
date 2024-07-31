import { Box, Grid, Button } from '@mui/material';
import { categories } from '../common/configuration/constants/CategoriesToSearch';



const Categories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} key={category.label}>
            <Button
              fullWidth
              variant={selectedCategory === category.label ? "contained" : "outlined"}
              startIcon={category.icon}
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              onClick={() => onSelectCategory(category.label)}
            >
              {category.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
