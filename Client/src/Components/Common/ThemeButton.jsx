// ThemeButton.js
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button } from '@mui/material';
const ThemeButton = ({ label, onClick , variant = 'primary',icon, disabled = false, fullWidth = false, loading = false }) => {
  return (
      <Button
        className={`text-capitalize button theme-button theme-button--${variant}`}
        onClick={onClick}
        disabled={disabled}
        variant='contained'
        startIcon={icon}
        fullWidth = {fullWidth}
        loading = {loading}
        loadingPosition="end"
        // size='large'
      >
        {label}
      </Button>
  );
};

ThemeButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
};

export default ThemeButton;
