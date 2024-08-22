import { Card, Typography } from "@mui/material";
import "../styles/PetLifeOverview.css";

const SleepPatterns = ({ sleepData }) => {
  return (
    <div className="sleep-patterns">
      <h2>Sleep Patterns</h2>
      {sleepData?.length === 0 ? (
        <Typography>No sleep data available</Typography>
      ) : (
        <div className="sleep-cards-countainer">
          {sleepData?.map((sleep, index) => (
            <Card key={index} className="sleep-card">
              <Typography fontWeight="bold" variant="h4">
                {sleep.duration}
              </Typography>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SleepPatterns;
