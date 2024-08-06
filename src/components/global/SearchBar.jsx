import { Paper, InputBase, Button, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import '../../styles/SearchBar.css'


const SearchBar = ({ selectedCategory, onSearch }) => {
  const handleSearch = () => {
    const searchQuery = document.getElementById('search-input').value;
    onSearch(searchQuery);
  };
  return (
    <Paper
      component="form"
     className='paperClass'
    >
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <InputBase
        id="search-input"
        sx={{ ml: 1, flex: 1 }}
        placeholder={`Search for ${selectedCategory ? selectedCategory.toLowerCase() : 'pet professionals'}`}
        inputProps={{ 'aria-label': `search for ${selectedCategory ? selectedCategory.toLowerCase() : 'pet professionals'}` }}
      />
      <Button variant="contained" color="success" sx={{ borderRadius: '10px', padding: '8px 16px' }} onClick={handleSearch}>
        Search
      </Button>
    </Paper>
  );
};

export default SearchBar;
