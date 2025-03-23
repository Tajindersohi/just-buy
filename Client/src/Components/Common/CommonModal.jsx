import React from 'react';
import { Box, Modal, IconButton, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeButton from './ThemeButton';
import appTheme from '../../Assets/Theme';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const CommonModal = ({ open, handleClose, children, handleSubmit, header = "", buttonTitle = "Submit", loginModal = false, loading = false, isDeleteModel = false, startIcon =null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: '10px',
    outline: 'none'
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color={appTheme.heading.primary} ><b>{header}</b></Typography>
          <IconButton onClick={handleClose} >
            <CancelRoundedIcon sx={{fontSize:30 , color:appTheme.colors.textSecondary}} />
          </IconButton>
        </Box>

        <Box mt={3}>
          {children}
        </Box>

        {!loginModal && (
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <ThemeButton label={"Close"} variant="secondary" onClick={handleClose} color="error"/>
            <ThemeButton label={buttonTitle} onClick={handleSubmit} variant= {isDeleteModel ? "danger" : "primary"} disabled={loading} loading={loading} icon = { startIcon  || null} />
          </Box>
        )}

        {loginModal && (
          <Box mt={3}>
            <ThemeButton label="Continue" onClick={handleSubmit} variant="primary" fullWidth disabled={loading} loading={loading} />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CommonModal;
