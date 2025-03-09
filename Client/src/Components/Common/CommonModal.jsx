import React from 'react';
import { Box, Modal, IconButton, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeButton from './ThemeButton';

const CommonModal = ({ open, handleClose, children, handleSubmit, header = "", buttonTitle = "Submit", loginModal = false, loading = false }) => {
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
          <Typography variant="h6" color="#02cfac"><b>{header}</b></Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={3}>
          {children}
        </Box>

        {!loginModal && (
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
            <ThemeButton label={buttonTitle} onClick={handleSubmit} variant="primary" />
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
