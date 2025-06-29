import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';

const ThemeButton = ({
  label,
  onClick,
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = false,
  loading = false,
  type = 'button',
  size = 'medium',
  sx = {}
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      variant="contained"
      color={variant} // Leverage MUI's theme system
      startIcon={!loading && icon}
      fullWidth={fullWidth}
      size={size}
      sx={{
        borderRadius: 2,
        textTransform: 'capitalize',
        minWidth: 100,
        px: 2,
        py: 1,
        ...sx
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
};

ThemeButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error']),
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ThemeButton;
