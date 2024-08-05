import { Box, CircularProgress } from '@mui/material';

const Loader = ({ size = 24, color = '#ffffff' }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: color,
                    animationDuration: '550ms',
                }}
                size={size}
                thickness={4}
            />
        </Box>
    );
};

export default Loader;
