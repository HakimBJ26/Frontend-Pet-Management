import { useEffect, useState } from 'react';
import UserInfo from '../../components/UserInfo';
import UserService from '../../service/UserService';
import { Box, Typography } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import StyledBox from '../../components/StyledBox';


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    UserService.getAllUsers().then(res => {
      setUsers(res);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.id.toString().includes(searchQuery)
  );

  return (
    <StyledBox>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Management
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage user information and roles
          </Typography>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </Box>
      {filteredUsers.map(user => (
        <UserInfo placeHolder="Search User By ID" key={user.id} user={user} />
      ))}
    
    </StyledBox>
  );
}

export default UserManagement;
