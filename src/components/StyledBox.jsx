import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '70px',
  padding: theme.spacing(2.5),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
}));

export default StyledBox;
