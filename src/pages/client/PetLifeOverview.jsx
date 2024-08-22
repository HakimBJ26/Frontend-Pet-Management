import { useContext, useEffect, useState } from "react";
import ActivityPropositions from "../../components/ActivityPropositions";
import PersonalizedSuggestions from "../../components/PersonalizedSuggestions";
import SleepPatterns from "../../components/SleepPatterns";
import "../../styles/PetLifeOverview.css"
import { PetContext } from "../../context/PetContext";
import petDataService from "../../service/PetDataService";
import SleepPatternsSkeleton from "../../components/skeleton/SleepPatternsSkeleton";
import ActivityPropositionsSkeleton from "../../components/skeleton/ActivityPropositionsSkeleton";

const PetLifeOverview = () => {
    const { selectedPetId } = useContext(PetContext);  
    const [sleepData,setSleepData]=useState([])
    const [activityData, setActivityData] = useState([])
    const [loading,setLoading]=useState(true)
  
    useEffect(() => {
      setLoading(true)
        const fetchSleepPatern = async () => {
          try {
            const res = await petDataService.getSleepPatterns(selectedPetId);
            setSleepData(res);
          } catch (err) {
            console.log("Error fetching sleep patern data:", err);
          }
        };
    
        fetchSleepPatern();
      }, [selectedPetId]);

      useEffect(() => {
        const fetchActivityPropositions = async () => {
          try {
            const res = await petDataService.getActivityPropositions();
            setActivityData(res);
            setTimeout(()=>{
                setLoading(false)
            },1000)
          } catch (err) {
            console.log("Error fetching activity proposition data:", err);
          }
        };
        fetchActivityPropositions();
      }, [selectedPetId]);


    return (
        <div className="countainer">
          {loading===true? 
           <>
            <SleepPatternsSkeleton />
            <ActivityPropositionsSkeleton /></>
          :
          <>
           <SleepPatterns sleepData={sleepData} />
            <ActivityPropositions activities={activityData} />
          </>
          }
            <PersonalizedSuggestions petId={selectedPetId} sleepPatterns={sleepData}  />
        </div>
    );
};

export default PetLifeOverview;
