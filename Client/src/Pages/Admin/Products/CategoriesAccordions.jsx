import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductList from './ProductList';
import DeleteModal from '../../../Components/Common/DeleteModal';

export default function CategoriesAccordions() {
  const [expanded, setExpanded] = useState('panel0');
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const theme = useTheme();
  const allCategories = useSelector((state) => state.category);

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDeleteClick = (e, categoryId) => {
    e.stopPropagation();
    setDeleteId(categoryId);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    // You can dispatch deleteCategory(deleteId) here
    console.log('Deleting category:', deleteId);
    setOpenDelete(false);
  };

  return (
    <Box sx={{borderRadius:0}}>
      {allCategories?.categories?.map((category, idx) => {
        const isExpanded = expanded === `panel${idx}`;
        return (
          <MuiAccordion
            key={category._id || idx}
            expanded={isExpanded}
            onChange={handleChange(`panel${idx}`)}
          >
            <MuiAccordionSummary
              expandIcon={
                <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary }} />
              }
              aria-controls={`panel${idx}d-content`}
              id={`panel${idx}d-header`}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'contain',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color={theme.palette.text.primary}
                  >
                    {category.name}
                  </Typography>
                </Box>
                <IconButton onClick={(e) => handleDeleteClick(e, category._id)}>
                  <DeleteIcon sx={{ color: theme.palette.error.main }} />
                </IconButton>
              </Box>
            </MuiAccordionSummary>

            <MuiAccordionDetails>
              <ProductList list={category.subcategories} />
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}

      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleSubmit={handleDeleteConfirm}
      >
        <Box mt={2} textAlign="center">
          Are you sure you want to delete this category along with all its subcategories and associated products?
        </Box>
      </DeleteModal>
    </Box>
  );
}
