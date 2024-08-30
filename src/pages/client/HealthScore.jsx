import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import petDataService from '../../service/PetDataService';
import WebSocketService from '../../service/WebSocketService';
import { HEALTH_SCORE_CANAL } from '../../common/configuration/constants/webSocketSub';
import { PetContext } from '../../context/PetContext';
import '../../styles/HealthScore.css'

const HealthScore = () => {
    const primaryColor = "#00A43C";
    const secondaryColor = "#027CFF";
    const backgroundColor = "#F5F5F5";
    const iconBackgroundColor = "#EDF8F1";
    const textColor = "#000000";

    const userId = localStorage.getItem("id");
    const { selectedPetId } = useContext(PetContext);
    const [healthScoreData, setHealthScoreData] = useState({});
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [sessionEnded, setSessionEnded] = useState(false);

    const fetchHealthScore = async () => {
        if (isSessionActive) {
            try {
                const res = await petDataService.getHealthScore(selectedPetId);
                setHealthScoreData(res);
            } catch (err) {
                console.error("Error fetching health score data:", err);
            }
        }
    };

    useEffect(() => {
        if (isSessionActive) {
            fetchHealthScore();

            const healthScoreService = new WebSocketService(HEALTH_SCORE_CANAL, userId, fetchHealthScore);
            healthScoreService.connect((data) => {
              if (data.petId == selectedPetId){
                    setHealthScoreData(data);
                }
            });

            return () => {
                healthScoreService.close();
            };
        }
    }, [userId, selectedPetId, isSessionActive]);

    const handleEndSession = () => {
        setIsSessionActive(false); 
        setSessionEnded(true); 
    };

    const speed = healthScoreData.speed ? parseFloat(healthScoreData.speed.replace(' km/h', '')) : 0;

    return (
        <Box className="myCustomClass">
            <Box className="flexContainer">
                <Box className="myCustomClass1">
                    <PetsIcon fontSize="large" sx={{ color: '#fff', fontSize: 40 }} />
                </Box>
                <Typography variant="h4" className="title">
                    Health Score
                </Typography>
            </Box>

            <>
                <Card className="card">
                    <CardContent>
                        <Typography variant="h6" className="title">View wellness metrics</Typography>
                        <Box className="flexContainer" style={{ justifyContent: 'space-around', marginTop: 16 }}>
                            <Box className="metricBox">
                                <Box className="iconBox">
                                    <MonitorHeartIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" className="title">Avg. Health</Typography>
                                <Typography variant="h6" className="title">{healthScoreData.avgHealth}</Typography>
                            </Box>
                            <Box className="metricBox">
                                <Box className="iconBox">
                                    <AccessTimeIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" className="title">Activity Time</Typography>
                                <Typography variant="h6" className="title">{healthScoreData.activityTime}</Typography>
                            </Box>
                            <Box className="metricBox">
                                <Box className="iconBox">
                                    <LocalFireDepartmentIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" className="title">Calories</Typography>
                                <Typography variant="h6" className="title">{healthScoreData.calories}</Typography>
                            </Box>
                            <Box className="metricBox">
                                <Box className="iconBox">
                                    <FavoriteIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" className="title">Heart Rate</Typography>
                                <Typography variant="h6" className="title">{healthScoreData.heartRate}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card className="card" style={{ position: 'relative' }}>
                    <CardContent>
                        <Typography variant="h6" className="title">Speed now</Typography>
                        <Typography variant="h6" className="title">{healthScoreData.speed}</Typography>

                        <Box className="flexContainer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box style={{ position: 'absolute', top: 8, right: 8 }}>
                                <IconButton>
                                    <MoreVertIcon sx={{ color: textColor, fontSize: 30 }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box className="flexContainer" style={{ justifyContent: 'space-around', marginTop: 40 }}>
                            {[{ label: 'Repos', speed: 0 }, { label: '5 km/h', speed: 5 }, { label: '10 km/h', speed: 10 }, { label: '15 km/h', speed: 15 }, { label: '20 km/h', speed: 20 }, { label: '25 km/h', speed: 25 }].map((item, index, array) => {
                                let barColor = 'white';
                                if (
                                    (index === 0 && speed === 0) ||
                                    (index > 0 && speed > array[index - 1].speed && speed <= item.speed)
                                ) {
                                    barColor = 'green';
                                }

                                return (
                                    <Box key={item.speed} className="metricBox">
                                        <Box className="speedBar" style={{ backgroundColor: barColor }} />
                                        <Typography variant="body2" className="title">
                                            {item.label}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </CardContent>
                </Card>

                <Box className="flexContainer" style={{ justifyContent: 'center', marginTop: 24 }}>
                    <Button 
                        variant="contained" 
                        className="endSessionButton"
                        onClick={handleEndSession}
                    >
                        End Session
                    </Button>
                </Box>
            </>
        </Box>
    );
};

export default HealthScore;
