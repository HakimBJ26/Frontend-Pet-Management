import { Card, Box, Typography } from "@mui/material";
import "../styles/PetLifeOverview.css";
import { useEffect, useState } from "react";
import PetService from "../service/PetService";
import petDataService from "../service/PetDataService";
import { convertSleepToHours } from "../utils/formatDate";
import catCalculateGif from "../images/cat_calculate.gif"; 

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
        newSuggestions.push({
          name: "Cool Down Session",
          duration: 20,
          benefits: "Helps reduce stress and energy levels",
        });
      }

      if (avgSleepDuration < 7 && activityLevel === "Low") {
        newSuggestions.push({
          name: "Interactive Play",
          duration: 30,
          benefits: "Boosts physical activity and mental stimulation",
        });
      }

      if (heartRate > 100 || temperature > 39) {
        newSuggestions.push({
          name: "Rest & Recovery",
          duration: 15,
          benefits: "Helps regulate heart rate and cool down body temperature",
        });
      }

      if (pet.age > 10 && activityLevel === "Medium") {
        newSuggestions.push({
          name: "Gentle Walk",
          duration: 15,
          benefits: "Improves mobility and relaxation for older pets",
        });
      }

      if (newSuggestions.length === 0) {
        newSuggestions.push({
          name: "Rest Time",
          duration: 30,
          benefits: "Encourages recovery and sleep",
        });
      }

      setSuggestions(newSuggestions.slice(0, 2));
      setLoading(false); // Stop loading animation
    }, 2000); // Simulate a delay for the "calculation"
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
