import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AccountMenu from './AccountMenu';
import Cart from './Cart';
import StickyCartBar from './StickyCartBar';
import Login from '../../Pages/Login';
import icons from '../../Assets/Icons/Icons';
import ThemeToggleButton from '../Common/ThemeToggleButton';
import SearchBar from '../Common/SearchBar';
import AddressModal from '../../Pages/Address';

const userPages = [
  { link: '/', title: 'Home' },
];

const adminPages = [
  { link: '/admin/dashboard', title: 'Dashboard' },
  { link: '/admin/products', title: 'Products' },
  { link: '/admin/orders', title: 'Orders' },
  { link: '/admin/users', title: 'Users' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);

  const user = authState.user || userState.user;
  const isAdmin = user?.userRole === 'admin';
  const pages = isAdmin ? adminPages : userPages;
  console.log("useruseruser",user);
  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius:0,
          boxShadow: theme.palette.mode === 'light'
            ? '0 2px 4px rgba(0,0,0,0.05)'
            : '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }} px={{xs:2, md:4}}>
          {/* Logo / Drawer */}
          <Box display="flex" alignItems="center">
              <>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  {icons.justBuy}
                </Link>
              </>
          </Box>
          {isMobile && user &&
          <Box display={'flex'} justifyContent={'center'} width={"100%"} gap={2}>
            <AddressModal/>
          </Box>
          }
          {!isMobile && 
          <Box display={'flex'} justifyContent={'center'} width={"100%"} gap={2}>
            {user &&
            <AddressModal/>}
            <Box width={'60%'}>
              <SearchBar/>
            </Box>
          </Box>
          }
          {/* Action Buttons */}
          <Box display="flex" alignItems="center" gap={'4px'}>
            
            {!isAdmin && (
              isMobile ? (
                <StickyCartBar onOpenCart={() => setCartOpen(true)} setModalType={setModalType} open={cartOpen} />
              ) : (
                <IconButton onClick={() => setCartOpen(true)}>
                  <Badge badgeContent={cartCount} color="success">
                    <ShoppingCartOutlinedIcon color="primary" />
                  </Badge>
                </IconButton>
              )
            )}
            {!user && (
              <Login modalType={modalType} setModalType={setModalType} />
            )}
            <ThemeToggleButton />
            {user && <AccountMenu />}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          {pages.map((page) => (
            <ListItem
              button
              key={page.title}
              component={Link}
              to={page.link}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={page.title} />
            </ListItem>
          ))}
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      {!isAdmin && cartOpen && (
        <Cart
          open={cartOpen}
          setOpen={setCartOpen}
          modalType={modalType}
          setModalType={setModalType}
        />
      )}
    </>
  );
};

export default Header;