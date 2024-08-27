import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { IconButton } from '@mui/material';
import '../../../../src/maps.css'
const Footer = () => {
  return (
    <div className="footer">
      <IconButton><HomeIcon sx={{color:'black'}}/></IconButton>
      <IconButton><DirectionsRunIcon sx={{color:'black'}}/></IconButton>
      <IconButton><HeartBrokenIcon sx={{color:'black'}}/></IconButton>
      <IconButton><AddToPhotosIcon sx={{color:'black'}}/></IconButton>
    </div>
  );
};
export default Footer;
