import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminDashStyledBox from './styledComponents/AdminDashStyledBox';

const AdminSection = ({ id, backgroundColor, title, description, navigatePath, buttonText }) => {
  const navigate = useNavigate();

  return (
    <AdminDashStyledBox
      id={id}
      sx={{ backgroundColor: backgroundColor }}
    >
      <Container>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
        <Button variant="contained" color="inherit" onClick={() => navigate(navigatePath)}>
          {buttonText}
        </Button>
      </Container>
    </AdminDashStyledBox>
  );
};

export default AdminSection;
