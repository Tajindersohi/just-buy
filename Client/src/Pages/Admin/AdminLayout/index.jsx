import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 190;

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = [
  {
    name:'Dashboard',
    route:'/admin/dashboard'
  },
  {
    name:'Products',
    route:'/admin/products'
  },
  {
    name:'Logout',
    route:'/admin/logout'
  }
]
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, overflow: 'auto' }}>
      <Toolbar />
      <List>
        {menuItems.map((item,idx) => (
          <ListItem button key={item.name}>
            <Link to={item.route}>{item.name}</Link>
            {/* <ListItemText primary={text} /> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar for Mobile Toggle */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: { sm: 'none' } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Admin Panel
          </Typography> */}
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Improve performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', overflow:'hidden' },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: { sm: `${drawerWidth}px` }, 
        }}
      >
        {/* <Toolbar /> */}
        {/* <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography> */}
        {children}
      </Box>
    </Box>
  );
}
