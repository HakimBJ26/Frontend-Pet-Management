import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const FloatingCartIcon = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: 80,
  right: 16,
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default FloatingCartIcon;
