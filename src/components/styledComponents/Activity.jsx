import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { formatDateTime } from "../utils/formatDate";

const Activity = ({ activityData }) => {
  return (
    <Paper
      style={{ padding: "16px", marginBottom: "16px", borderRadius: "8px" }}
    >
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
          gap={1}
          flexDirection="column"
        >
          <Typography variant="h5" fontWeight="bold">
            Steps
          </Typography>
          <Typography>{activityData.steps}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
          flexDirection="column"
        >
          <Typography variant="h5" fontWeight="bold">
            Average Burn
          </Typography>
          <Typography>{activityData.averageBurn}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
          flexDirection="column"
        >
          <Typography variant="h5" fontWeight="bold">
            Health Score
          </Typography>
          <Typography>{activityData.healthScore.toFixed(2)}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
          flexDirection="column"
        >
          <Typography variant="h5" fontWeight="bold">
            Time Spent in Activity
          </Typography>
          <Typography>{activityData.timeSpentInActivity}</Typography>
        </Box>
      </Box>
      <Typography marginTop="10px" variant="body2" color="textSecondary">
        Last Updated: {formatDateTime(activityData.lastUpdated)}
      </Typography>
    </Paper>
  );
};

export default Activity;
