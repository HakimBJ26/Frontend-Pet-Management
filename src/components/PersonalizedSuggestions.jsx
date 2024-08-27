import { Card, Box, Typography } from "@mui/material";
import "../styles/PetLifeOverview.css";
import { useEffect, useState } from "react";
import PetService from "../service/PetService";
import petDataService from "../service/PetDataService";
import { convertSleepToHours } from "../utils/formatDate";
import catCalculateGif from "../images/cat_calculate.gif"; 
import { COOL_DOWN_SESSION, GENTEL_WALK, INTERACTIVE_PLAY, REST_AND_RECOVERY, REST_TIME } from "../common/configuration/constants/PersonilizedActivities";

const PersonalizedSuggestions = ({ sleepPatterns, petId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [pet, setPet] = useState({});
  const [vitalSigns, setVitalSigns] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await PetService.getPetProfile(petId);
        setPet(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, [petId]);

  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        const res = await petDataService.getVitalSigns(petId);
        setVitalSigns(res);
        generateSuggestions(res);
      } catch (err) {
        console.log("Error fetching vital signs data:", err);
      }
    };

    fetchVitalSigns();
  }, [petId]);

  const generateSuggestions = (vitalSigns) => {
    setLoading(true); 

    setTimeout(() => {
      const { heartRate, temperature, activityLevel } = vitalSigns;
      const avgSleepDuration = sleepPatterns.reduce((total, pattern) => total + convertSleepToHours(pattern.duration), 0) / sleepPatterns.length;
      let newSuggestions = [];

      if (activityLevel === "High") {
        newSuggestions.push(COOL_DOWN_SESSION);
      }

      if (avgSleepDuration < 7 && activityLevel === "Low") {
        newSuggestions.push(INTERACTIVE_PLAY);
      }

      if (heartRate > 100 || temperature > 39) {
        newSuggestions.push(REST_AND_RECOVERY);
      }

      if (pet.age > 10 && activityLevel === "Medium") {
        newSuggestions.push(GENTEL_WALK);
      }

      if (newSuggestions.length === 0) {
        newSuggestions.push(REST_TIME);
      }

      setSuggestions(newSuggestions.slice(0, 2));
      setLoading(false);
    }, 2000); 
  };

  return (
    <div className="personalized-suggestions">
      <h2>Personalized Suggestions</h2>
      <Card className="suggestion-card">
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
            <img src={catCalculateGif} alt="Calculating cat" style={{ width: "150px", height: "auto" }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Mr. Misty Calculating suggestions...
            </Typography>
          </Box>
        ) : (
          suggestions?.map((suggestion, index) => (
            <div key={index}>
              <h3>{suggestion.name}</h3>
              <p>Duration: {suggestion.duration} minutes</p>
              <p>Health Benefits: {suggestion.benefits}</p>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default PersonalizedSuggestions;
