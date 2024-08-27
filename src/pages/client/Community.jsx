import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Divider, CircularProgress, Button, Box } from '@mui/material';
import ChatService from '../../service/ChatService';

function Community() {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const userId = localStorage.getItem('id');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{marginTop:10}}>
      <Typography fontWeight='bold' variant="h4"  gutterBottom>
        Community
      </Typography>
<Divider/>
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
      </Box>

      <Grid container spacing={4}>
        {activeTab === 'all' && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  All Groups
                </Typography>
                <Divider />
                {allGroups.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">
                    No groups available.
                  </Typography>
                ) : (
                  allGroups.map(group => (
                    <Card key={group.id} variant="elevation" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6"  fontWeight='bold' component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {group.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {activeTab === 'user' && (
          <Grid item xs={12}>
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
                        <Typography variant="h6" fontWeight='bold' component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {group.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Community;
