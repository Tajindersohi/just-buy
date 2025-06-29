import React from 'react';
import {
  Box,
  Modal,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ThemeButton from './ThemeButton';

const CommonModal = ({
  open,
  handleClose,
  children,
  handleSubmit,
  header = '',
  buttonTitle = 'Submit',
  loginModal = false,
  loading = false,
  isDeleteModel = false,
  startIcon = null,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '90%',
    maxWidth: '430px',
    transform: 'translate(-50%, -50%)',
    // width: isMobile ? '90%' : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 3,
    outline: 'none',
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            {header}
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ fontSize: 26, color: theme.palette.text.secondary }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box mt={3}>{children}</Box>

        {/* Actions */}
        {!loginModal && (
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <ThemeButton
              label="Close"
              onClick={handleClose}
              variant="secondary"
              color="error"
            />
            <ThemeButton
              label={buttonTitle}
              onClick={handleSubmit}
              variant={isDeleteModel ? 'danger' : 'primary'}
              disabled={loading}
              loading={loading}
              icon={startIcon}
            />
          </Box>
        )}

        {/* Login Modal Submit */}
        {loginModal && (
          <Box mt={3}>
            <ThemeButton
              label="Continue"
              onClick={handleSubmit}
              variant="primary"
              fullWidth
              disabled={loading}
              loading={loading}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CommonModal;
