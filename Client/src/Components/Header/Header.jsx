import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const pages = [{link:'/',title:'Home' },{link:'/about',title:'About Us' },{link:'/contact',title:'Contact' }];

function Header() {

  return (
    <AppBar position="static" sx={{ background: "transparent", boxShadow:"none" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex', height:"60px", alignItems:'center', gap:"80px" } }}>
            {pages.map((page) => (
                <Link to={page.link}>{page.title}</Link>
            ))}
            </Box>
        </Box>
    </AppBar>

  );
}
export default Header;
