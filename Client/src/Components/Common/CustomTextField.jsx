// src/components/common/CustomTextField.js

import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};

export default CustomTextField;
