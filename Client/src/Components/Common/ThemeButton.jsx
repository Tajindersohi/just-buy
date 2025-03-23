import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, useTheme } from '@mui/material';
import appTheme from '../../Assets/Theme';

const ThemeButton = ({ label, onClick, variant = 'primary', icon, disabled = false, fullWidth = false, loading = false }) => {

  const buttonStyles = {
    primary: {
      backgroundColor: appTheme.colors.primary,
      color: appTheme.colors.background,
      "&:hover": { backgroundColor: appTheme.colors.dark },
    },
    secondary: {
      backgroundColor: appTheme.colors.secondary,
      color: appTheme.colors.background,
      "&:hover": { backgroundColor: appTheme.colors.dark },
    },
    danger: {
      backgroundColor: appTheme.colors.danger,
      color: appTheme.colors.background,
      "&:hover": { backgroundColor: appTheme.colors.dark },
    },
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant="contained"
      startIcon={icon}
      fullWidth={fullWidth}
      sx={{
        ...buttonStyles[variant],
        borderRadius: appTheme.borderRadius.md,
        textTransform: 'capitalize',
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

ThemeButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ThemeButton;
