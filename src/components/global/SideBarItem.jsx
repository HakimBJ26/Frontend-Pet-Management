
import { tokens } from '../../theme';
import { Typography, useTheme } from '@mui/material';
import { MenuItem } from "react-pro-sidebar";

const SideBarItem = ({ title, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <MenuItem active={selected === title} style={{ color: colors.primary[700] }} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
  
    </MenuItem>
  );
}

export default SideBarItem;
