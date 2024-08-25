import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PetsIcon from '@mui/icons-material/Pets';
import petDataService from '../../service/PetDataService';
import WebSocketService from '../../service/WebSocketService';
import { HEALTH_SCORE_CANAL } from '../../common/configuration/constants/webSocketSub';
import { PetContext } from '../../context/PetContext';

const HealthScore = () => {
    const theme = useTheme();
    const primaryColor = "#00A43C";
    const secondaryColor = "#027CFF";
    const backgroundColor = "#F5F5F5";
    const iconBackgroundColor = "#EDF8F1";
    const cardBackgroundColor = "#F0F0F0";
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
                if (data.heartRate !== undefined && data.petId === selectedPetId) {
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
        <Box
            sx={{
                maxWidth: 450,
                margin: '0 auto',
                padding: 3,
                backgroundColor: backgroundColor,
                borderRadius: 3,
                boxShadow: 4,
                marginTop: '64px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: secondaryColor,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PetsIcon fontSize="large" sx={{ color: '#fff', fontSize: 40 }} />
                </Box>
                <Typography variant="h4" sx={{ marginLeft: 2, color: textColor, fontWeight: 'bold' }}>
                    Health Score
                </Typography>
            </Box>

            <>
                <Card sx={{ marginBottom: 3, backgroundColor: cardBackgroundColor }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: textColor, fontWeight: 'bold' }}>View wellness metrics</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: iconBackgroundColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MonitorHeartIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" sx={{ color: textColor, fontWeight: 'bold' }}>Avg. Health</Typography>
                                <Typography variant="h6" sx={{ color: textColor }}>{healthScoreData.avgHealth}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: iconBackgroundColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <AccessTimeIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" sx={{ color: textColor, fontWeight: 'bold' }}>Activity Time</Typography>
                                <Typography variant="h6" sx={{ color: textColor }}>{healthScoreData.activityTime}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: iconBackgroundColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <LocalFireDepartmentIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" sx={{ color: textColor, fontWeight: 'bold' }}>Calories</Typography>
                                <Typography variant="h6" sx={{ color: textColor }}>{healthScoreData.calories}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: iconBackgroundColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FavoriteIcon fontSize="large" sx={{ color: secondaryColor, fontSize: 35 }} />
                                </Box>
                                <Typography variant="body1" sx={{ color: textColor, fontWeight: 'bold' }}>Heart Rate</Typography>
                                <Typography variant="h6" sx={{ color: textColor }}>{healthScoreData.heartRate}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ marginBottom: 1, backgroundColor: cardBackgroundColor, position: 'relative' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: textColor, fontWeight: 'bold' }}>Speed now</Typography>
                        <Typography variant="h6" sx={{ color: textColor }}>{healthScoreData.speed}</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                <IconButton>
                                    <MoreVertIcon sx={{ color: textColor, fontSize: 30 }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                            {[{ label: 'Repos', speed: 0 }, { label: '5 km/h', speed: 5 }, { label: '10 km/h', speed: 10 }, { label: '15 km/h', speed: 15 }, { label: '20 km/h', speed: 20 }, { label: '25 km/h', speed: 25 }].map((item, index, array) => {
                                let barColor = 'white';
                                if (
                                    (index === 0 && speed === 0) ||
                                    (index > 0 && speed > array[index - 1].speed && speed <= item.speed)
                                ) {
                                    barColor = 'green';
                                }

                                return (
                                    <Box key={item.speed} sx={{ textAlign: 'center' }}>
                                        <Box sx={{
                                            width: 20,
                                            height: 150,
                                            borderRadius: '10px',
                                            backgroundColor: barColor,
                                            border: '2px solid black',
                                            marginBottom: 2,
                                            mx: 'auto'
                                        }} />
                                        <Typography variant="body2" sx={{ color: textColor }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </CardContent>
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: 'green', 
                    height: '50px', 
                    width: '400px', 
                    fontSize: '18px', 
                    '&:hover': {
                        backgroundColor: 'darkgreen'
                    }
                }} 
                onClick={handleEndSession}
            >
                End session
            </Button>
                </Box>
            </>
        </Box>
    );
};

export default HealthScore;
