import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithOtp, sendOtp } from '../../store/redux/thunks';
import { showError } from '../../Assets/Constants/showNotifier';
import CommonModal from '../../Components/Common/CommonModal';
import ThemeButton from '../../Components/Common/ThemeButton';
import { useTheme } from '@mui/material';
import { resetOtpSent } from '../../store/redux/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import appTheme from '../../Assets/Theme';

export default function Login({modalType, setModalType}) {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpen = useCallback(() => setModalType('phone'), []);
    const handleClose = useCallback(() => {
        setModalType(null);
        setNumber("");
        setOtp("");
    }, []);

    const handleChange = (key, val) => {
        if (key === "number" && /^\d{0,10}$/.test(val)) setNumber(val);
        if (key === "otp") setOtp(val);
    };

    const handleSentOtp = async () => {
        setLoading(true);
        try {
            if (modalType === 'phone') {
                if (number.length < 10) {
                    showError("Enter a valid Phone Number");
                    return;
                }
                dispatch(sendOtp({ phoneNumber: number }));
            } else {
                await dispatch(loginWithOtp({ phoneNumber: number, otp }));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userState.sent) {
            setModalType('otp');
        }
        if (userState.isAuthenticated && userState.user) {
            handleClose();
        }
    }, [userState.sent, userState.isAuthenticated]);

    const handleChangeNumber = () => {
        dispatch(resetOtpSent());
        setModalType('phone');
    };

    return (
        <>
            {isMobile ? 
            <IconButton onClick={handleOpen} ><AccountCircleIcon fontSize='large' sx={{ color: appTheme.colors.primary }}/></IconButton>
            :<ThemeButton label="Login" onClick={handleOpen} variant="primary" icon={<LoginIcon />} />
            }
            {/* Phone Number Modal */}
            <CommonModal
                open={modalType === 'phone'}
                handleClose={handleClose}
                header="Login or Sign Up"
                buttonTitle="Send OTP"
                handleSubmit={handleSentOtp}
                loginModal={true}
                loading={loading}
            >
                <Box width={isMobile ? 'auto' : '400px'} p={isMobile ? 2 : 3}>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel htmlFor="phone-input">Enter Mobile Number</InputLabel>
                        <OutlinedInput
                            value={number}
                            onChange={(e) => handleChange('number', e.target.value)}
                            id="phone-input"
                            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                            label="Enter Mobile Number"
                            type='number'
                        />
                    </FormControl>
                </Box>
            </CommonModal>

            {/* OTP Modal */}
            <CommonModal
                open={modalType === 'otp'}
                handleClose={handleClose}
                header="OTP Verification"
                buttonTitle="Login"
                handleSubmit={handleSentOtp}
                loading={loading}
            >
                <Box width={isMobile ? 'auto' : '400px'} p={isMobile ? 2 : 3}>
                    <TextField
                        value={otp}
                        type="number"
                        fullWidth
                        onChange={(e) => handleChange('otp', e.target.value)}
                        variant="outlined"
                        placeholder="Enter OTP"
                    />
                    {userState.message && (
                        <Typography variant="body2" mt={1} textAlign="center">
                            {userState.message} sent to <b>+{number}</b>
                        </Typography>
                    )}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="text" onClick={handleChangeNumber}>Change Number?</Button>
                    </Box>
                </Box>
            </CommonModal>
        </>
    );
}
