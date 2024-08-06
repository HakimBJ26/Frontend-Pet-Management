import React from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PetsIcon from '@mui/icons-material/Pets';
import SpeedIcon from '@mui/icons-material/Speed';

const HealthScore = () => {
    const theme = useTheme();
    const primaryColor = "#00A43C";
    const secondaryColor = "#027CFF";
    const backgroundColor = "#F5F5F5";
    const iconBackgroundColor = "#EDF8F1";
    const cardBackgroundColor = "#F0F0F0";
    const buttonColor = "#027CFF";
    const endSessionButtonColor = "#00A43C";
    const textColor = "#000000";

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: '0 auto',
                padding: 2,
                backgroundColor: backgroundColor,
                borderRadius: 2,
                boxShadow: 3,
                marginTop: '64px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: secondaryColor,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PetsIcon fontSize="large" sx={{ color: '#fff' }} />
                </Box>
                <Typography variant="h5" sx={{ marginLeft: 1, color: textColor }}>Health Score</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="body2" sx={{ color: textColor, marginRight: 1 }}>Monitor your</Typography>
                <Button
                    variant="contained"
                    sx={{ marginRight: 1, backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryColor } }}
                >
                    view
                </Button>
                <Typography variant="body2" sx={{ color: textColor }}>Current</Typography>
            </Box>

            <Card sx={{ marginBottom: 2, backgroundColor: cardBackgroundColor }}>
                <CardContent>
                    <Typography variant="subtitle1" sx={{ color: textColor }}>View wellness metrics</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 1 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: iconBackgroundColor,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MonitorHeartIcon fontSize="large" sx={{ color: secondaryColor }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColor }}>Avg. Health</Typography>
                            <Typography variant="subtitle2" sx={{ color: textColor }}></Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: iconBackgroundColor,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <AccessTimeIcon fontSize="large" sx={{ color: secondaryColor }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColor }}>Activity Time</Typography>
                            <Typography variant="subtitle2" sx={{ color: textColor }}></Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: iconBackgroundColor,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <LocalFireDepartmentIcon fontSize="large" sx={{ color: secondaryColor }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColor }}>Calories</Typography>
                            <Typography variant="subtitle2" sx={{ color: textColor }}></Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: iconBackgroundColor,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FavoriteIcon fontSize="large" sx={{ color: secondaryColor }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColor }}>Heart Rate</Typography>
                            <Typography variant="subtitle2" sx={{ color: textColor }}></Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ marginBottom: 2, backgroundColor: cardBackgroundColor }}>
                <CardContent>
                    <Typography variant="subtitle1" sx={{ color: textColor }}>Speed now</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: primaryColor }}></Typography>
                        <IconButton>
                            <MoreVertIcon sx={{ color: textColor }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: textColor }}>10 km/h</Typography>
                            <SpeedIcon fontSize="large" sx={{ color: secondaryColor }} />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: textColor }}>20 km/h</Typography>
                            <SpeedIcon fontSize="large" sx={{ color: secondaryColor }} />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: textColor }}>30 km/h</Typography>
                            <SpeedIcon fontSize="large" sx={{ color: secondaryColor }} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: endSessionButtonColor, '&:hover': { backgroundColor: endSessionButtonColor } }}
            >
                End session
            </Button>
        </Box>
    );
};

export default HealthScore;
