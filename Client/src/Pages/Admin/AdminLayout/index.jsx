import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  AppBar,
  Divider,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useLocation } from 'react-router-dom';
import icons from '../../../Assets/Icons/Icons';
import appTheme from '../../../Assets/Theme';

const drawerWidth = 220;

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: <DashboardIcon />, relatedRoute: [] },
    { name: 'Categories', route: '/admin/categories', icon: <InventoryIcon />, relatedRoute: ["/products"] },
    { name: 'Logout', route: '/admin/logout', icon: <ExitToAppIcon />, relatedRoute: [] },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: '100vh',
        // backgroundColor: appTheme.colors.background,
        color: appTheme.colors.text,
        display: 'flex',
        flexDirection: 'column',
        gap:2
        // justifyContent: 'space-between',
      }}
    >
      <Toolbar sx={{display:'flex' ,justifyContent:'center'}} >
        <Box >
          <Link to={'/'}>
            {icons.justBuy}
          </Link>
        </Box>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route || item.relatedRoute.some(route => location.pathname.startsWith(route));

          return (
            <ListItem
              button
              key={item.name}
              component={Link}
              to={item.route}
              sx={{
                color: isActive ? appTheme.colors.light : appTheme.colors.dark,
                backgroundColor: isActive ? appTheme.colors.primary : 'transparent',
                '&:hover': {
                  backgroundColor: appTheme.colors.primary,
                  color: appTheme.colors.light,
                },
                borderRadius: appTheme.borderRadius.md,
                my:1.5,
                padding: appTheme.spacing.sm,
                transition: appTheme.transitions.medium,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>

      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          display: { sm: 'none' },
          backgroundColor: appTheme.colors.primary,
          boxShadow: appTheme.boxShadow.md,
          minHeight: '48px',
        }}
      >
        <Toolbar sx={{ minHeight: '48px', padding: '0 16px' }}> {/* Compact Toolbar */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontSize: '16px' }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // bgcolor: appTheme.colors.background,
          p: appTheme.spacing.md,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Toolbar />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
