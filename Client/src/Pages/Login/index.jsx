import React, { useState, useEffect, useCallback } from 'react';
import CommonModal from '../../Components/Common/CommonModal';
import ThemeButton from '../../Components/Common/ThemeButton';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, FilledInput, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithOtp, sendOtp } from '../../store/redux/thunks';
import { showError } from '../../Assets/Constants/showNotifier';

export default function Login() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const [modalType, setModalType] = useState(null); 
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");

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
        if (modalType === 'phone') {
            if (number.length < 10) {
                showError("Enter a valid Phone Number");
                return;
            }
            dispatch(sendOtp({ phoneNumber: number }));
            setModalType('otp');
        } else {
            await dispatch(loginWithOtp({ phoneNumber: number, otp }));
        }
    };

    useEffect(() => {
        if (userState.sent) {
            setModalType('otp');
        }
        if (userState.isAuthenticated && userState.user) {
            handleClose();
        }
    }, [userState.sent, userState.isAuthenticated, handleClose]);

    const handleChangeNumber = () => {
        setModalType('phone');
    }
    return (
        <>
            <ThemeButton label="Login" onClick={handleOpen} variant="primary" icon={<LoginIcon />} />
            
            <CommonModal
                open={modalType === 'phone'}
                handleClose={handleClose}
                header="Login or Sign Up"
                buttonTitle="Send OTP"
                handleSubmit={handleSentOtp}
                loginModal = {true}
            >
                <Box fullWidth width={'500px'} >
                    <Grid container>
                        <Grid item xs={12} textAlign="center">
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <InputLabel htmlFor="filled-adornment-amount">Enter Mobile Number</InputLabel>
                                <OutlinedInput
                                    value={number} 
                                    onChange={(e) => handleChange('number', e.target.value)} 
                                    id="filled-adornment-amount"
                                    startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                    label="Enter Mobile Number"
                                    type='number'
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </CommonModal>

            <CommonModal
                open={modalType === 'otp'}
                handleClose={handleClose}
                header="OTP Verification"
                buttonTitle="Login"
                handleSubmit={handleSentOtp}
            >
                <Box>
                    {/* <Grid container> */}
                        <Grid item xs={12} textAlign="center">
                            <Box display={'flex'} flexDirection={'column'} gap={1} justifyContent={"space-between"} minWidth={"310px"} minHeight={"120px"} alignItems={'center'}>
                                <TextField 
                                    value={otp}
                                    sx={{ borderRadius: "10px" }} 
                                    type="number" 
                                    fullWidth
                                    onChange={(e) => handleChange('otp', e.target.value)} 
                                    variant="outlined" 
                                    placeholder="Enter OTP"
                                />
                                {userState.message && 
                                <Typography  variant='p'>{userState.message} sent to <b>+{number}</b></Typography>}
                                <Box display={'flex'} alignItems={'center'}>
                                    <Button variant='text' className='button'>Resend</Button> 
                                    <Typography>or</Typography>
                                    <Button variant='text' className='button' onClick={handleChangeNumber}>Change Number ?</Button>
                                </Box>
                            </Box>
                    </Grid>
                </Box>
            </CommonModal>
        </>
    );
}
