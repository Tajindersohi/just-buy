import React, {  useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { create, login } from '../../store/redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';
// import { useshowNotifier } from '../../Assets/Constants/showNotifier';
// import { showError, showSuccess } from '../../Assets/Constants/showNotifier';

export default function AdminLogin() {
    const user = useSelector((state)=>state.auth.user)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [type, setType] = useState(true);
    const navigate = useNavigate()
    // const { success, error } = useshowNotifier();

    useEffect(()=>{
        if(user) navigate('/admin/dashboard') 
    },[user])
    const dispatch = useDispatch();
    
    // const handleLogin = () => {
    //     setEmailError(!email.includes('@'));
    //     setPasswordError(password.length < 6);

    //     if (email.includes('@') && password.length >= 6) {
    //         console.log('Login Successful');
    //     }
    // };

    const postLogin = async (e) =>{
        e.preventDefault();
        const credentials = { email, password };
    
        try {
            if(type){
                await dispatch(login(credentials)).unwrap();
                showSuccess("Login Successfull");
            }else{
                await dispatch(create(credentials)).unwrap();
                showSuccess("Register Successfull");
            }
        } catch (err) {
          showError(err);
          console.error('Login failed:', err);
        }   
    }

    
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: '2rem', 
                    width: '400px', 
                    textAlign: 'center' 
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Admin {type ? 'Login' : 'Register'}
                </Typography>

                <TextField 
                    fullWidth 
                    label="Email" 
                    placeholder="Enter your email" 
                    margin="normal"
                    variant="outlined" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailError ? "Please enter a valid email address" : ""}
                />
                <TextField 
                    fullWidth 
                    label="Password" 
                    type="password" 
                    placeholder="Enter your password" 
                    margin="normal"
                    variant="outlined" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? "Password must be at least 6 characters" : ""}
                />
                
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    sx={{ marginTop: '1rem' }}
                    onClick={postLogin}
                >
                    {type ? 'Login' : 'Register'}
                </Button>
                <Button onClick={()=> setType(!type)}>{type ? 'Register ?' : 'Login ?'}</Button>
            </Paper>
        </Box>
    );
}
