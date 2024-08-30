import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Divider, CircularProgress, Button, Box, IconButton, TextField } from '@mui/material';
import ChatService from '../../service/ChatService';
import { useNavigate } from 'react-router-dom';
import { CLIENT_DASH_PATH, GROUP_CHAT } from '../../common/configuration/constants/Paths';
import AddIcon from '@mui/icons-material/Add';
import CreateGroupModal from '../../components/model/GroupChatModal';
import useToast from '../../hooks/useToast';
import { ERROR_JOIN_GROUP_CHAT_CREATED_TOAST, SUCCESS_JOIN_GROUP_CHAT_CREATED_TOAST } from '../../common/configuration/constants/ToastConfig';

function Community() {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem('id');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const allGroupsResponse = await ChatService.getGroups();
        setAllGroups(allGroupsResponse);

        const userGroupsResponse = await ChatService.getGroupsByUser(userId);
        setUserGroups(userGroupsResponse);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId]);

  const handleJoinGroup = async (groupId) => {
    try {
      await ChatService.joinGroupChat(userId, groupId);
      const updatedUserGroups = await ChatService.getGroupsByUser(userId);
      setUserGroups(updatedUserGroups);
      showToast(SUCCESS_JOIN_GROUP_CHAT_CREATED_TOAST);
    } catch (error) {
      console.error('Error joining group:', error);
      showToast(ERROR_JOIN_GROUP_CHAT_CREATED_TOAST);
    }
  };

  const handleGroupClick = (groupId, groupName) => {
    navigate(`${CLIENT_DASH_PATH}${GROUP_CHAT}`, {
      state: { groupId: groupId, groupName: groupName },
    });
  };

  const handleOpenCreateGroupModal = () => {
    setIsCreateGroupModalOpen(true);
  };

  const handleCloseCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
  };

  const handleGroupCreated = async () => {
    const updatedAllGroups = await ChatService.getGroups();
    const updatedUserGroups = await ChatService.getGroupsByUser(userId);
    setAllGroups(updatedAllGroups);
    setUserGroups(updatedUserGroups);
  };

  const filteredGroups = allGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography fontWeight="bold" variant="h4" gutterBottom>
        Community
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button
          variant={activeTab === 'all' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('all')}
        >
          All Groups
        </Button>
        <Button
          variant={activeTab === 'user' ? 'contained' : 'outlined'}
          sx={{ ml: 2 }}
          onClick={() => setActiveTab('user')}
        >
          Your Groups
        </Button>
        <IconButton
          color="primary"
          onClick={handleOpenCreateGroupModal}
          sx={{ ml: 2 }}
        >
          <AddIcon />
        </IconButton>
      </Box>

     
      {activeTab === 'all' && (
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search Groups"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      )}

      <Grid container spacing={4}>
        {activeTab === 'all' && (
          <Grid item xs={12}  mb={10}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  All Groups
                </Typography>
                <Divider />
                {filteredGroups.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">
                    No groups available.
                  </Typography>
                ) : (
                  filteredGroups.map(group => (
                    <Card key={group.id} variant="elevation" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {group.description}
                        </Typography>
                        {!userGroups.find(userGroup => userGroup.id === group.id) && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleJoinGroup(group.id, group.name)}
                            sx={{ mt: 2 }}
                          >
                            Join
                          </Button>
                        )}
                        {userGroups.find(userGroup => userGroup.id === group.id) && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleGroupClick(group.id, group.name)}
                            sx={{ mt: 2 }}
                          >
                            View
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {activeTab === 'user' && (
          <Grid item xs={12} mb={10}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Your Groups
                </Typography>
                <Divider />
                {userGroups.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">
                    You are not a member of any groups.
                  </Typography>
                ) : (
                  userGroups.map(group => (
                    <Card key={group.id} variant="elevation" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {group.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleGroupClick(group.id)}
                          sx={{ mt: 2 }}
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <CreateGroupModal
        open={isCreateGroupModalOpen}
        handleClose={handleCloseCreateGroupModal}
        onGroupCreated={handleGroupCreated}
      />
    </Container>
  );
}

export default Community;
