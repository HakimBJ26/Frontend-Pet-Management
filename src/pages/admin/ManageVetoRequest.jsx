import { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Avatar,
  Container,
} from "@mui/material";
import Loader from "../../Loading/Loader";
import { tokens } from "../../theme";

function ManageVetoRequest() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colors = tokens();

  useEffect(() => {
    UserService.getVetoAcoountToApproved().then((res) => {
      setRequests(res);
      setFilteredRequests(res);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = requests.filter(
        (request) =>
          (request?.name || "").toLowerCase().includes(query) ||
          (request?.email || "").toLowerCase().includes(query) ||
          (request?.phone || "").toLowerCase().includes(query) ||
          (request?.city || "").toLowerCase().includes(query)
      );
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  }, [searchQuery, requests]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleApprove = async (email) => {
    setIsLoading(true);
    await UserService.approveVetoRequest(email).then(() => {
      setRequests(requests.filter((request) => request.email !== email));
      setFilteredRequests(
        filteredRequests.filter((request) => request.email !== email)
      );
      setIsLoading(false);
    });
  };

  return (
    <Container sx={{ marginTop: "80px", width: "60%" }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
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
        sx={{ mb: 3, width: "50%" }}
      />
      <TableContainer component={Paper} sx={{ width: "100%" }}>
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
            {filteredRequests?.length === 0 && (
              <TableRow><Typography variant="h4" padding={2} textAlign='center'>
                 no request to show ..
                </Typography></TableRow>
            )}
            {filteredRequests.map((request) => (
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
                    {isLoading ? (
                      <Loader size={24} color={colors.grey[200]} />
                    ) : (
                      <span>Approve</span>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ManageVetoRequest;
