import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/redux/thunks';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <Box p={3} height={'100vh'}>
        <Typography variant="h4" gutterBottom>
            Dashboard
        </Typography>
        {/* <Button onClick={()=>handleLogout()}>Logout</Button> */}
        Welcome to the dashboard
    </Box>
  );
}
