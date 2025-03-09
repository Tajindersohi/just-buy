import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop:5,
  border: `1px solid rgba(94, 158, 148, 0.45)`,
  borderRadius: '40px 10px 0 0',
  '&:not(:last-child)': {
    // borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon 
        sx={{ 
          fontSize: '1rem', 
          transition: 'transform 0.3s ease' 
        }} 
      />
    }
    {...props}
  />
))(({ theme, expanded }) => ({
  backgroundColor: expanded 
    ? 'rgba(102, 165, 127, 0.4)'  // Light green when expanded
    : 'rgba(0, 0, 0, 0.05)',  // Subtle gray when collapsed
  flexDirection: 'row-reverse',
  borderRadius: expanded ? '10px 10px 0 0' : '10px',
  transition: 'all 0.3s ease',
  boxShadow: expanded ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
  // padding: theme.spacing(1.5, 2),
  
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
  },

  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    fontWeight: expanded ? 600 : 500,
    color: expanded ? '#1b5e20' : '#333',
  },

  '&:hover': {
    backgroundColor: 'rgba(102, 165, 127, 0.5)',
    cursor: 'pointer',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CategoriesAccordions() {
  const [expanded, setExpanded] = React.useState('panel0');
  const allCategories = useSelector((state) => state.category);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    
  };

  return (
    <Box width={'auto'}>
      {allCategories &&
        allCategories.categories.length > 0 &&
        allCategories.categories.map((category, idx) => {
          const isExpanded = expanded === `panel${idx}`;
          return (
            <Accordion
              key={idx}
              expanded={isExpanded}
              sx={{
                borderRadius: isExpanded ? '10px 10px 0px 0px' : '10px',
              }}
              onChange={handleChange(`panel${idx}`)}
            >
              <AccordionSummary
                sx={{ height: '20px' }}
                aria-controls={`panel${idx}d-content`}
                id={`panel${idx}d-header`}
                expanded={isExpanded}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'100%'}
                >
                  <Box display={'flex'} alignItems={'center'} gap={3}>
                    <img
                      src={category.imageUrl}
                      alt="Preview"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ccc',
                      }}
                    />
                    <Typography color = {!expanded ? 'rgb(12, 131, 31)' : 'rgb(12, 131, 31)'}  variant='h6'>
                      {category.name}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={(e) => handleDelete(e)}>
                      <DeleteIcon />
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
    </Box>
  );
}