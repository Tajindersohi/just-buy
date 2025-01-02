import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/redux/thunks';
import { useNavigate } from 'react-router-dom';
import { useNotifierUtils } from '../../../Assets/Constants/showNotifier';

export default function Dashboard() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { success, error } = useNotifierUtils();
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      success('Logout Successfully');
      navigate('/admin/login');
    } catch (err) {
      error(err);
      console.error('Logout failed:', err);
    }
  };

  return (
    <Box>
      <Button onClick={()=>handleLogout()}>Logout</Button>
      Welcome to the dashboard
    </Box>
  );
}
