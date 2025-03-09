import * as React from 'react';
import Box from '@mui/material/Box';
import CategoriesAccordions from './CategoriesAccordions';

export default function Categories() {
  return (
    <Box sx={{ height: 700, width: '100%', overflow:'auto' }}>
        <CategoriesAccordions/>
    </Box>
  );
}
