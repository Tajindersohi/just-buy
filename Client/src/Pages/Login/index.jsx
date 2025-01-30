import React, { useState, useEffect, useCallback } from 'react';
import CommonModal from '../../Components/Common/CommonModal';
import ThemeButton from '../../Components/Common/ThemeButton';
import LoginIcon from '@mui/icons-material/Login';
import { Grid, TextField } from '@mui/material';
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

    return (
        <>
            <ThemeButton label="Login" onClick={handleOpen} variant="primary" icon={<LoginIcon />} />
            
            <CommonModal
                open={modalType === 'phone'}
                handleClose={handleClose}
                header="Login or Sign Up"
                buttonTitle="Send OTP"
                handleSubmit={handleSentOtp}
            >
                <Grid container>
                    <Grid item xs={12} textAlign="center">
                        <TextField 
                            value={number} 
                            sx={{ borderRadius: "10px" }} 
                            type="number" 
                            onChange={(e) => handleChange('number', e.target.value)} 
                            variant="outlined" 
                            placeholder="Enter Mobile Number"
                        />
                    </Grid>
                </Grid>
            </CommonModal>

            <CommonModal
                open={modalType === 'otp'}
                handleClose={handleClose}
                header="Enter OTP"
                buttonTitle="Login"
                handleSubmit={handleSentOtp}
            >
                <Grid container>
                    <Grid item xs={12} textAlign="center">
                        <TextField 
                            value={otp} 
                            sx={{ borderRadius: "10px" }} 
                            type="number" 
                            onChange={(e) => handleChange('otp', e.target.value)} 
                            variant="outlined" 
                            placeholder="Enter OTP"
                        />
                    </Grid>
                </Grid>
            </CommonModal>
        </>
    );
}
