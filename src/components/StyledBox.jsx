import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxSizing: 'border-box',
  width: '100%',
}));

export const CenteredContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  marginTop:'100px'
});