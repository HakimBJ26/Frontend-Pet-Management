import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { getEmojiByHealthStatus } from '../utils/emojiByHealthStatus';

const Overview = ({overviewData}) => {
  return (
    <Paper style={{ padding: '16px', marginBottom:'80px'}}>
    <Typography variant="h4" fontWeight='bold' gutterBottom>Recent Activities:</Typography>
    
    <Box sx={{display:'flex',gap:1}}>
    {overviewData?.recentActivity?.map((activity,index)=>{
        return <Typography key={index}>{activity}{index !== overviewData.recentActivity.length - 1 ? "," : ""}
        </Typography>
    })}
    </Box>
     
       <Typography variant="h4" fontWeight='bold' gutterBottom>Upcoming Check-ups: </Typography>
      <Typography>Next check-up on {overviewData.nextCheckUp}</Typography>
      <Typography variant="h4" fontWeight='bold' gutterBottom>Health Status: </Typography>
      <Typography fontSize='2.5rem'>{getEmojiByHealthStatus(overviewData.healthStatus)}</Typography>
    </Paper>
  );
};

export default Overview;
