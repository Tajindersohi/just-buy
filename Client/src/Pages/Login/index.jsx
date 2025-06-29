import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithOtp, sendOtp } from '../../store/redux/thunks';
import { resetOtpSent } from '../../store/redux/authSlice';
import { showError } from '../../Assets/Constants/showNotifier';
import CommonModal from '../../Components/Common/CommonModal';
import ThemeButton from '../../Components/Common/ThemeButton';
import appTheme from '../../Assets/Theme';

export default function Login({ modalType, setModalType }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = useCallback(() => setModalType('phone'), []);
  const handleClose = useCallback(() => {
    setModalType(null);
    setNumber('');
    setOtp('');
  }, []);

  const handleChange = (key, val) => {
    if (key === 'number' && /^\d{0,10}$/.test(val)) setNumber(val);
    if (key === 'otp') setOtp(val);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      if (modalType === 'phone') {
        if (number.length < 10) {
          showError('Enter a valid phone number');
          return;
        }
        dispatch(sendOtp({ phoneNumber: number }));
      } else {
        await dispatch(loginWithOtp({ phoneNumber: number, otp }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userState.sent) setModalType('otp');
    if (userState.isAuthenticated && userState.user) handleClose();
  }, [userState.sent, userState.isAuthenticated]);

  const handleChangeNumber = () => {
    dispatch(resetOtpSent());
    setModalType('phone');
  };

  return (
    <>
      {isMobile ? (
        <IconButton onClick={handleOpen}>
          <AccountCircleIcon fontSize="large" sx={{ color: appTheme.colors.primary }} />
        </IconButton>
      ) : (
        <ThemeButton label="Login" onClick={handleOpen} variant="primary" icon={<LoginIcon />} />
      )}

      {/* 📱 Phone Number Modal */}
      <CommonModal
        open={modalType === 'phone'}
        handleClose={handleClose}
        header="Login or Sign Up"
        buttonTitle="Send OTP"
        handleSubmit={handleSendOtp}
        loginModal
        loading={loading}
      >
        <Box width={isMobile ? '100%' : '400px'} px={2} py={1}>
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="phone-input">Enter Mobile Number</InputLabel>
            <OutlinedInput
                id="phone-input"
                value={number}
                onChange={(e) => handleChange('number', e.target.value)}
                startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                label="Enter Mobile Number"
                type="tel"
                sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 2,
                },
                }}
            />
            </FormControl>
        </Box>
      </CommonModal>

      {/* 🔐 OTP Modal */}
      <CommonModal
        open={modalType === 'otp'}
        handleClose={handleClose}
        header="OTP Verification"
        buttonTitle="Login"
        handleSubmit={handleSendOtp}
        loading={loading}
      >
        <Box width={isMobile ? '100%' : '400px'} px={2} py={1}>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => handleChange('otp', e.target.value)}
            sx={{ borderRadius: 3 }}
          />
          {userState.message && (
            <Typography variant="body2" mt={1} textAlign="center">
              {userState.message} sent to <strong>+{number}</strong>
            </Typography>
          )}
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="text" onClick={handleChangeNumber}>
              Change Number?
            </Button>
          </Box>
        </Box>
      </CommonModal>
    </>
  );
}
