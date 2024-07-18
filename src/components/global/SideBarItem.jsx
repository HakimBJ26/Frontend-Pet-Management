
import { tokens } from '../../theme';
import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuItem } from "react-pro-sidebar";

const SideBarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <MenuItem active={selected === title} style={{ color: colors.grey[100] }} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} style={{ textDecoration: 'none' }}>

      </Link>
    </MenuItem>
  );
}

export default SideBarItem;
