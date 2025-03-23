import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import appTheme from '../../../Assets/Theme';
import CommonModal from '../../../Components/Common/CommonModal';
import { useState } from 'react';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteModal from '../../../Components/Common/DeleteModal';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  marginTop: appTheme.spacing.md,
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: appTheme.borderRadius.lg,
  backgroundColor: appTheme.colors.contentBackground,
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon 
        sx={{ 
          fontSize: appTheme.typography.fontSize.sm, 
          transition: appTheme.transitions.medium,
          color: appTheme.colors.textSecondary
        }} 
      />
    }
    {...props}
  />
))(({ expanded }) => ({
  backgroundColor: expanded ? `${appTheme.colors.success}30` : appTheme.colors.light, // Light green when expanded
  flexDirection: 'row-reverse',
  borderRadius: expanded ? `${appTheme.borderRadius.md} ${appTheme.borderRadius.md} 0 0` : appTheme.borderRadius.md,
  transition: appTheme.transitions.medium,
  boxShadow: expanded ? appTheme.boxShadow.md : 'none',

  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: appTheme.transitions.medium,
  },

  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: appTheme.spacing.sm,
    fontWeight: expanded ? appTheme.typography.fontWeight.semiBold : appTheme.typography.fontWeight.medium,
    color: expanded ? appTheme.colors.primary : appTheme.colors.textPrimary,
  },

  '&:hover': {
    backgroundColor: `${appTheme.colors.primaryDark}`,
    cursor: 'pointer',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: appTheme.spacing.md,
  borderTop: `1px solid ${appTheme.colors.border}`,
}));

export default function CategoriesAccordions() {
  const [expanded, setExpanded] = React.useState('panel0');
  const allCategories = useSelector((state) => state.category);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setOpenDelete(true);
  };

  const handleClose = (e) => {
    setOpenDelete(false);
  };

  const deleteCategory = () => {

  };

  return (
    <Box width={'auto'}>
      {allCategories?.categories?.map((category, idx) => {
        const isExpanded = expanded === `panel${idx}`;
        return (
          <Accordion
            key={idx}
            expanded={isExpanded}
            sx={{
              borderRadius: isExpanded ? `${appTheme.borderRadius.md} ${appTheme.borderRadius.md} 0 0` : appTheme.borderRadius.md,
            }}
            onChange={handleChange(`panel${idx}`)}
          >
            <AccordionSummary
              sx={{ height: appTheme.spacing.lg,
                  backgroundColor: isExpanded ? appTheme.colors.primaryDark :  appTheme.colors.primaryLight
               }}
              aria-controls={`panel${idx}d-content`}
              id={`panel${idx}d-header`}
              expanded={isExpanded}
            >
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Box display={'flex'} alignItems={'center'} gap={appTheme.spacing.md}>
                  <img
                    src={category.imageUrl}
                    alt="Preview"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'contain',
                      border: `1px solid ${appTheme.colors.secondary}`,
                    }}
                  />
                  <Typography 
                    color={!expanded ? appTheme.colors.primary : appTheme.colors.primary}  
                    variant='h6'
                    fontWeight={appTheme.typography.fontWeight.semiBold}
                  >
                    {category.name}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon sx={{ color: appTheme.colors.danger }} />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ProductList list={category.subcategories} />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <DeleteModal open={openDelete} handleClose={handleClose} handleSubmit={deleteCategory}>
          <Box mt={2} textAlign="center">
          Are you sure you want to delete this category along with all its subcategories and associated products
          </Box>
      </DeleteModal>
    </Box>
  );
}
