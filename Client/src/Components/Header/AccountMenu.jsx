import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { logout, logoutUser } from '../../store/redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { logoutAdmin } from '../../store/redux/adminAuthSlice';
import { Link } from 'react-router-dom';
import appTheme from '../../Assets/Theme';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authState = useSelector((state) => state.auth);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleLogout = async() => {
        if(authState.user){
            await dispatch(logout());
        }else{
            await dispatch(logoutUser());
        }
        window.location.href = '/';
    };
    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                
                <AccountCircleIcon sx={{ color: appTheme.colors.primary }} fontSize='large'/>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
            paper: {
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
            <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Avatar /> My account
            </MenuItem>
            {authState.user && 
            <>
            <MenuItem component={Link} to="/admin/dashboard">
                <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Dashboard
            </MenuItem>
            <MenuItem component={Link} to="/admin/categories">
                <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Categories
            </MenuItem>
            </>
            }

            <Divider />
            {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
            </MenuItem> */}
            <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
            Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}
