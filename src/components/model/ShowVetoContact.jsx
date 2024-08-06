import { Box,  IconButton, Typography, useTheme } from '@mui/material';
import StyledModel from '../styledComponents/StyledModel';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function ShowVetoContact({ open, onClose, vetoContact}) {
    const theme = useTheme()

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
  return (
    <StyledModel open={open} onClose={onClose}>
    <Box className='custom-content-box-detail-model' sx={{background:theme.palette.secondary.main}}>
         <Box display="flex" justifyContent="space-between" alignItems="center">
           <Typography variant="h6">Veto Contact</Typography>
           <IconButton onClick={onClose}>
             <CloseIcon />
           </IconButton>
         </Box>
         <Box>
            <Typography variant='h6' fontWeight='bold'>
                Name: {vetoContact?.name}
            </Typography>
            <Typography variant='h6' fontWeight='bold'>
                City: {vetoContact?.city}
            </Typography>
            <Typography variant='h6' fontWeight='bold'>
                Email: {vetoContact?.email}
                <IconButton onClick={() => handleCopyToClipboard(vetoContact?.email)}>
                    <ContentCopyIcon />
                </IconButton>
            </Typography>
            <Typography variant='h6' fontWeight='bold'>
                Phone: {vetoContact?.phone}
                <IconButton onClick={() => handleCopyToClipboard(vetoContact?.phone)}>
                    <ContentCopyIcon />
                </IconButton>
            </Typography>
         </Box>

         </Box>
        
    </StyledModel>
  )
}

export default ShowVetoContact