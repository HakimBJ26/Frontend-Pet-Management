import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
}));

export default StyledBox;
