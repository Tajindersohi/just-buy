import React, { useState } from 'react';
import { 
  AppBar, Box, IconButton, TextField, InputAdornment, Drawer, 
  List, ListItem, ListItemText, Typography 
} from '@mui/material';
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
import appTheme from '../../Assets/Theme';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AccountMenu from './AccountMenu';
import Cart from './Cart';
import StickyCartBar from './StickyCartBar ';

const pages = [
  { link: '/', title: 'Home' },
  { link: '/about', title: 'About Us' },
  { link: '/contact', title: 'Contact' }
];


function Header() {
  const userState = useSelector((state) => state.user);
  const [modalType, setModalType] = useState(null);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  return (
    <AppBar 
      position="static"
      sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        pt: appTheme.spacing.md,
        top: 0,
        zIndex: 1100
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: appTheme.spacing.md }}>
          {!isMobile ? (
            <>
              <Link to={'/'}>
                {icons.justBuy}
              </Link>
            </>
          ) : (
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: appTheme.colors.primary }} fontSize='large'/>
            </IconButton>
          )}
        </Box>

        {/* Search Bar - Only Show on Larger Screens */}
        {!isMobile && (
          <Box sx={{ flex: 1, maxWidth: '600px', margin: `0 ${appTheme.spacing.md}` }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: appTheme.colors.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {/* Right Section: Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: appTheme.spacing.md }}>
          {!authState.user && !userState.user && <Login modalType = {modalType}  setModalType = {setModalType}/>}
          {!authState.user && 
            <>
            {!isMobile ?  
                <ThemeButton
                  variant="primary"
                  icon={<ShoppingCartOutlinedIcon />}
                  label="My Cart"
                  onClick={()=> setOpenCart(true)}
                  style={{
                    backgroundColor: appTheme.colors.primary,
                    color: appTheme.colors.textContrast,
                  }}
                />
                :
                <StickyCartBar onOpenCart={() => setOpenCart(true)} setModalType = {setModalType} open={openCart}/>
              }
              {openCart && <Cart open={openCart} setOpen={setOpenCart} modalType={modalType} setModalType = {setModalType}/>}
            </>
          }

          {(userState.user || authState.user) && (
            <AccountMenu/>
          )}
        </Box>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250, background: appTheme.colors.background, height: '100%' }}>
          {pages.map((page) => (
            <ListItem button component={Link} to={page.link} onClick={() => setOpenDrawer(false)} key={page.title}>
              <ListItemText primary={page.title} sx={{ color: appTheme.colors.textPrimary }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
