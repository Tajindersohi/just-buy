import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThemeButton from '../Common/ThemeButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Login from '../../Pages/Login';
import { useSelector } from 'react-redux';
import icons from '../../Assets/Icons/Icons';
const pages = [{link:'/',title:'Home' },{link:'/about',title:'About Us' },{link:'/contact',title:'Contact' }];

function Header() {
const userState = useSelector((state)=>state.user);
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', padding: '10px 20px', top: 0,
      zIndex: 1100,  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            <Link to={'/admin/dashboard'}>
              {icons.justBuy}
            </Link>
            <Typography fontWeight={700} color="black">
              Delivery in 9 minutes
              {userState.user && userState.user.phoneNumber}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, maxWidth: '1200px', margin: '0 20px' }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <Login/>
          <ThemeButton variant="primary" icon={<ShoppingCartOutlinedIcon />} label="My Cart" onClick={()=>console.log("clicked")}/>
        </Box>
      </Box>
    </AppBar>

  );
}
export default Header;
