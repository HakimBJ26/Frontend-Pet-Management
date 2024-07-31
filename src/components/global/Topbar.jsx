
import { AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import { SIGN_IN_PATH } from '../../common/configuration/constants/Paths';
import { LightModeOutlined } from '@mui/icons-material';
import { DarkModeOutlined } from '@mui/icons-material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function TopBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {setCurrentUser}=useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        </Typography>


        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>

        <IconButton color="inherit" onClick={() => {
        try{
          UserService.logout();
          setCurrentUser(null)
          navigate(`${SIGN_IN_PATH}`)
        }catch(err){

          console.log(err)
        }
        }}>
          <ExitToAppOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Logout</Typography>

        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
