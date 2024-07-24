import { useEffect, useState } from 'react';
import UserService from '../../service/UserService'; 
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Avatar } from '@mui/material';
import { CenteredContainer, StyledBox } from '../../components/StyledBox';

function ManageVetoRequest() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    UserService.getVetoAcoountToApproved().then(res => {
      setRequests(res);
      setFilteredRequests(res); 
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = requests.filter(request => 
        (request?.name || '').toLowerCase().includes(query) ||
        (request?.email || '').toLowerCase().includes(query) ||
        (request?.phone || '').toLowerCase().includes(query) ||
        (request?.city || '').toLowerCase().includes(query)
      );
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  }, [searchQuery, requests]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleApprove = (email) => {
    UserService.approveVetoRequest(email).then(() => {
      setRequests(requests.filter(request => request.email !== email));
      setFilteredRequests(filteredRequests.filter(request => request.email !== email));
    });
  };

  return (
    <CenteredContainer>
      <StyledBox sx={{ maxWidth: '65vw' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Veto Requests
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
          Review and approve veto requests
        </Typography>
        <TextField
          label="Search by Name, Email, Phone, or City"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3, width: '50%' }}
        />
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>
                    <Avatar src={request.imageUrl} />
                  </TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.city}</TableCell>
                  <TableCell>{request.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(request.email)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledBox>
    </CenteredContainer>
  );
}

export default ManageVetoRequest;
