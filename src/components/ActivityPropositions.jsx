import { Card, Typography } from "@mui/material";
import "../styles/PetLifeOverview.css";

const ActivityPropositions = ({ activities }) => {
  return (
    <div className="activity-propositions">
      <h2>Activity Propositions</h2>
      {activities?.length === 0 ? (
        <Typography>No activities data available</Typography>
      ) : (
        <Card className="activity-card">
          {activities?.map((activity, index) => (
            <div key={index}>
              <h3>{activity.name}</h3>
              <p>Duration: {activity.duration} minutes</p>
              <p>Frequency: {activity.frequency}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default ActivityPropositions;
