import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeButton from '../../../Components/Common/ThemeButton';
import CommonModal from '../../../Components/Common/CommonModal';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { addProduct } from '../../../store/redux/productThunk';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesAccordions from './CategoriesAccordions';
import ImageUploader from '../../../Components/Common/ImageUploader';
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
export default function Categories() {
const allCategories = useSelector((state) => state.product);
const [openAddProduct, setOpenAddProduct] = React.useState(false);
const [openAddCategory, setOpenAddCategory] = React.useState(false);
const [newProduct, setNewProduct] = React.useState({
    category:"",
    name:"",
    price:0,
    imageUrl:"www.myImage.com",
    discount:0 
});

const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(addProduct(newProduct))
    }
    const handleProduct = () => {
        setOpenAddProduct(true);
    }
    const handleProductClose = () => {
        setOpenAddProduct(false);
    }
    const handleCategory = () => {
        setOpenAddCategory(true);
    }
    const handleCategoryClose = () => {
        setOpenAddCategory(false);
    }
    const handleChange = (key, value) => {
        setNewProduct((prev) => ({
            ...prev,
            [key]: value, 
        }));
    };
    console.log("newProduct",newProduct);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <Box textAlign={'end'} my={2}>
            <Box display={'flex'} gap={2}  justifyContent={'flex-end'}>
                <ThemeButton label = {'Add Product'} onClick={handleProduct} variant = 'primary'  icon={<AddIcon/>}/>
                <ThemeButton label = {'Add Category'} onClick={handleCategory} variant = 'primary'  icon={<AddIcon/>}/>
            </Box>
            <CommonModal open={openAddProduct} handleClose={handleProductClose} handleSubmit={handleSubmit} header='Add Product' buttonTitle="Add">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField  
                        sx={{width:"100%"}}
                        onChange={(e)=>handleChange('name', e.target.value)}
                        variant='outlined' label='Enter Product name' />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl sx={{width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">Select Category</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        // value={personName}
                        // onChange={handleChange}
                        input={<OutlinedInput label="Select Category" />}
                        MenuProps={MenuProps}
                        >
                        {allCategories.categories.map((category,idx) => (
                            <MenuItem
                            key={idx}
                            value={category.id}
                            >
                            {category.category}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={{width:"100%"}}
                            id="product-price"
                            label="Price"
                            type="number"
                            onChange={(e)=>handleChange('price', e.target.value)}
                        />  
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={{width:"100%"}}
                            id="product-discount"
                            label="Discount If Any"
                            type="number"
                            onChange={(e)=>handleChange('discount', e.target.value)}
                        />  
                    </Grid>
                    <Grid item xs={6}>
                        <Box display={'flex'} m={0.5} alignItems={'center'}>
                            <Typography mr={2}>Product Image: </Typography>
                            <ImageUploader/>
                        </Box>
                    </Grid>
                </Grid>
            </CommonModal>
            <CommonModal open={openAddCategory} handleClose={handleCategoryClose} handleSubmit={handleSubmit} header='Add Category' buttonTitle="Submit">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField sx={{width:"100%"}} onChange={(e)=>handleChange('category', e.target.value)} variant='outlined' label='Enter Category name'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={'flex'} m={0.5} alignItems={'center'}>
                            <Typography mr={2}>Category Logo: </Typography>
                            <ImageUploader/>
                        </Box>
                    </Grid>
                </Grid>
            </CommonModal>
        </Box>
        <CategoriesAccordions/>
    </Box>
  );
}
