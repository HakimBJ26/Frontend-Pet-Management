import { Card, Skeleton } from "@mui/material";
import "../../styles/PetLifeOverview.css";

const ActivityPropositionsSkeleton = () => {
  return (
    <div className="activity-propositions">
      <h2>Activity Propositions</h2>
      <Card className="activity-card">
        {[...Array(2)].map((_, index) => (
          <div key={index}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ActivityPropositionsSkeleton;
