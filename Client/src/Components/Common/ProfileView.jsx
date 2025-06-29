import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/redux/thunks'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const user = authState.user || userState.user;  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const handleEditProfile = () => {
    // Navigate to profile edit page (if available)
    navigate('/edit-profile');
  };

  if (!user) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: isMobile ? 3 : 4,
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: theme.palette.primary.main,
            fontSize: 32,
          }}
        >
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>

        <Typography variant="h6" fontWeight={700}>
          {user.name || 'Guest User'}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {user.email || 'no-email@domain.com'}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            bgcolor: theme.palette.success.light,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            mt: 1,
          }}
        >
          Role: {user.userRole || 'user'}
        </Typography>

        <Divider sx={{ width: '100%', my: 3 }} />

        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditProfile}
            sx={{ textTransform: 'none' }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Profile;
