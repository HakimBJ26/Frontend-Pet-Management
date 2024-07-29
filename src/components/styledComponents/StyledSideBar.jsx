import { styled } from '@mui/material/styles';
import { Sidebar } from 'react-pro-sidebar';
import { tokens } from '../../theme'; 


const StyledSidebar = styled(Sidebar)(({ theme }) => {
  const colors = tokens(theme.palette.mode);

  return {
    backgroundColor: theme.palette.background.paper,
    '.pro-menu-item': {
       backgroundColor: colors.neutral[200],
      '&.active': {
          backgroundColor: colors.neutral[200]
      },
    },
  };
});

export default StyledSidebar;
