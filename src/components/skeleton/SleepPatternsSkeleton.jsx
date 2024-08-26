import {  Skeleton } from "@mui/material";
import "../../styles/PetLifeOverview.css";

const SleepPatternsSkeleton = () => {
  return (
    <div>
      <h2>Sleep Patterns</h2>

      <div className="sleep-cards-countainer">
        <Skeleton width={100} height={200} />
        <Skeleton width={100} height={200} />
        <Skeleton width={100} height={200} />
      </div>
    </div>
  );
};

export default SleepPatternsSkeleton;
