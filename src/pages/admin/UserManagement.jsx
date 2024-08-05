import { useEffect, useState } from 'react';
import UserService from '../../service/UserService';
import {  Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { CenteredContainer, StyledBox } from '../../components/StyledBox';
import UpdateUserModal from '../../components/model/UpdateUserModel';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    UserService.getAllUsers().then(res => {
      setUsers(res);
      setFilteredUsers(res); 
    });
  }, [open]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery;
      const filtered = users.filter(user => 
        (user?.name || '').includes(query) ||
        (user?.email || '').includes(query) ||
        (user?.phone || '').includes(query) ||
        (user?.city || '').includes(query) ||
        (user?.role || '').includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setFilteredUsers(filteredUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <CenteredContainer>
      <StyledBox sx={{ maxWidth: '65vw'}}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
          Manage user information and roles
        </Typography>
        <TextField
          label="Search by Name, Email, Phone, City, or Role"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3, width: '50%' }}
        />
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(user)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedUser && (
          <UpdateUserModal
            open={open}
            handleClose={handleCloseModal}
            user={selectedUser}
            onUserUpdate={handleUserUpdate}
          />
        )}
      </StyledBox>
    </CenteredContainer>
  );
}

export default UserManagement;
