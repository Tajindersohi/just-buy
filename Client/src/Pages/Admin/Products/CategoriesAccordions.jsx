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
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CategoriesAccordions() {
  const [expanded, setExpanded] = React.useState('');
  const allCategories = useSelector((state) => state.product);
  console.log("allCategories",allCategories);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
  }
  return (
    <Box width={'auto'}>
      { allCategories && allCategories.categories.length > 0 && allCategories.categories.map((category,idx) => {
        return <Accordion  expanded={expanded === `panel${idx}`} sx={{borderRadius:'10px'}} onChange={handleChange(`panel${idx}`)}>
          <AccordionSummary sx={{height:'20px'}}  aria-controls="panel1d-content" id="panel1d-header">
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              <Box display={'flex'} alignItems={'center'} gap={3}>
                <img
                  src={category.imageUrl}
                  alt="Preview"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius:"50%", 
                    objectFit: 'cover',
                    border: '1px solid #ccc',
                  }}
                />
                <Typography color='#0c8342' component="h5" variant='h6'>{category.category}</Typography>
              </Box>
                <Box>
                  <IconButton onClick={(e)=>handleDelete(e)}>
                     <DeleteIcon/>
                  </IconButton>
                </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ProductList list={category.products}/>
          </AccordionDetails>
        </Accordion>
      })}
    </Box>
  );
}
