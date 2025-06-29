// src/Components/Common/CommonChip.js
import React from 'react';
import { Chip } from '@mui/material';

// Utility to convert string to Camel Case
const toCamelCase = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const colorMap = {
  root_admin: 'error',
  admin: 'primary',
  user: 'secondary',
  client: 'success',
  active: 'success',
  inactive: 'default',
  pending: 'warning',
  completed: 'success',
  failed: 'error',
};

const CommonChip = ({
  label = '',
  size = 'small',
  color = null,
  variant = 'filled',
  icon = null,
  sx = { textTransform: 'capitalize' },
}) => {
  const resolvedColor = color || colorMap[label?.toLowerCase?.()] || 'default';
  const formattedLabel = toCamelCase(label);

  return (
    <Chip
      label={formattedLabel}
      size={size}
      variant={variant}
      color={resolvedColor}
      icon={icon}
      sx={sx}
    />
  );
};

export default CommonChip;
