import { Box } from '@mui/material';
import { styled } from '@mui/system';

const AdminDashStyledBox= styled(Box)(({ theme }) => ({
  margin: '40px',
  padding:'20px',
  borderRadius: theme.shape.borderRadius * 2,
  width: '100%',
}));

export default AdminDashStyledBox