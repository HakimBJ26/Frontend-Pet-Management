import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CardMedia, LinearProgress } from '@mui/material';
import '../styles/SearchResults.css';
import { VETO_CATEGORIES } from '../common/configuration/constants/CategoriesToSearch';
import ShowVetoContact from './model/ShowVetoContact';

const SearchResults = ({ results, selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [modelIsOpen,setModelOpen]=useState(false)
  const [selectedVeto,setSelectedVeto]=useState()

  useEffect(() => {
    setLoading(true)
    if (results !== null) {
      setTimeout(() => {
        setLoading(false);
      }, "1000");
    }
  }, [results]);

  if (selectedCategory !== VETO_CATEGORIES) {
    return null;
  }

  function handleOnClose(){
    setModelOpen(false)
  }

  return (
    <Box className="boxScrollClassSearchResult">
      {loading && <LinearProgress />}
      <Box sx={{ display: 'inline-flex', flexDirection: 'row' }}>
        {results?.length === 0 && !loading ? (
          <Typography variant="body1">No results found.</Typography>
        ) : (
          results?.map((result) => (
            <Card key={result.id} className="cardClassSearchResult">
              <CardContent>
                <Box className="boxFlexClass">
                  <CardMedia
                    component="img"
                    sx={{ height: 40, width: 40 }}
                    image='https://cdn-icons-png.flaticon.com/512/5987/5987420.png' // temporary until now
                    alt={result.name}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight='bold'>{result.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {result.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  City: {result.city}
                </Typography>
                <Button variant="contained" color="success" onClick={()=>{
                  setModelOpen(true)
                  setSelectedVeto(result)
                }} fullWidth>
                  Contact
                </Button>
              </CardContent>
            
            </Card>
          ))
         
        )}
      </Box>
      <ShowVetoContact open={modelIsOpen} vetoContact={selectedVeto} onClose={handleOnClose}/>
    </Box>
  );
};

export default SearchResults;
