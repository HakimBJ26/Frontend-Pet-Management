import { useState } from 'react';
import {  Container, Typography } from '@mui/material';
import Categories from '../../components/Categories';
import SearchResults from '../../components/SearchResults';
import Accessories from '../../components/Accessories';
import SearchBar from '../../components/global/SearchBar';
import UserService from '../../service/UserService';
import { ACCESSORIES_CATEGORIES, VETO_CATEGORIES } from '../../common/configuration/constants/CategoriesToSearch';

const SearchForVetoAndProds = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); 
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      let results;
      if (selectedCategory === VETO_CATEGORIES) {
        results = await UserService.searchVeterinariansByName(query);
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <SearchBar onSearch={handleSearch} selectedCategory={selectedCategory} />
      <Typography variant="h4" sx={{mt:1}} fontWeight='Bold'>
        Categories
      </Typography>
      <Categories selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      {selectedCategory === VETO_CATEGORIES && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }} fontWeight='Bold'>
            Search Results
          </Typography>
       <SearchResults results={searchResults} selectedCategory={selectedCategory} />
        </>
      )}
      {selectedCategory === ACCESSORIES_CATEGORIES && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }} fontWeight='Bold'>
            Accessories
          </Typography>
          <Accessories selectedCategory={selectedCategory} searchQuery={searchQuery} />
        </>
      )}
    </Container>
  );
};

export default SearchForVetoAndProds;
