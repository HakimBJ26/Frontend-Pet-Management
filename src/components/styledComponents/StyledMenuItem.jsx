import { styled } from '@mui/material/styles';
import { MenuItem } from 'react-pro-sidebar';
import { tokens } from '../../theme'; 

const StyledMenuItem = styled(MenuItem)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  return {
    backgroundColor: theme.palette.background.paper,
    '&.active': {
        backgroundColor: colors.neutral[200]
    },
  };
});

export default StyledMenuItem;
