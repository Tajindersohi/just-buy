import React, { useState } from 'react';
import { AppBar, Box, IconButton, TextField, InputAdornment, Drawer, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../Pages/Login';
import ThemeButton from '../Common/ThemeButton';
import icons from '../../Assets/Icons/Icons';
import { useTheme, useMediaQuery } from '@mui/material';
import { logout } from '../../store/redux/thunks';

const pages = [{ link: '/', title: 'Home' }, { link: '/about', title: 'About Us' }, { link: '/contact', title: 'Contact' }];

function Header() {
  const userState = useSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/';
  }
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', pt:2, top: 0, zIndex: 1100 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        {/* Left Section: Logo & Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {!isMobile ? (
            <>
              <Link to={'/admin/dashboard'}>
                {icons.justBuy}
              </Link>
              <Typography fontWeight={700} color="black">
                Delivery in 9 minutes
              </Typography>
            </>
          ) : (
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Search Bar - Only Show on Larger Screens */}
        {!isMobile && (
          <Box sx={{ flex: 1, maxWidth: '600px', margin: '0 20px' }}>
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
        )}

        <Box sx={{ display: 'flex', alignItems: 'space-between', gap: '20px' }}>
        {!userState.user && <Login />}
          <ThemeButton variant="primary" icon={<ShoppingCartOutlinedIcon />} label="My Cart" onClick={() => console.log("clicked")} />
         {userState.user && <ThemeButton variant="primary" icon={<ShoppingCartOutlinedIcon />} label="Logout" onClick={handleLogout} />}
        </Box>
      </Box>

      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/" onClick={() => setOpenDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={() => setOpenDrawer(false)}>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={() => setOpenDrawer(false)}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
