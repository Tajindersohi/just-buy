import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getProductsList } from '../../../store/redux/productThunk';
import Categories from './Categories';
import { useLoading } from '../../../Components/Common/LoadingIndicator';
import { showError, showSuccess } from '../../../Assets/Constants/showNotifier';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import ThemeButton from '../../../Components/Common/ThemeButton';
import CommonModal from '../../../Components/Common/CommonModal';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { addProduct } from '../../../store/redux/productThunk';
import ImageUploader from '../../../Components/Common/ImageUploader';

const variants = ['h1', 'h3', 'body1', 'caption'];
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
export default function Category() {
  const dispatch = useDispatch();
  const { showLoading } = useLoading();
  const errorMsg = useSelector((state) => state.product.error); 
  const [loading, setLoading] = useState(false);
  const allCategories = useSelector((state) => state.product);
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProduct, setNewProduct] = React.useState({
      categoryId:"",
      productName:"",
      price:0,
      imageUrl:"www.myImage.com",
      discount:0 
  });
  const [newCategory, setNewCategory] = React.useState({
      category:"",
      imageUrl:"www.myImage.com",
  });


  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true)
    // showLoading({ loading: true }); 
    try {
      await dispatch(getProductsList());
      console.log("errorMsg",errorMsg);
      if(errorMsg && errorMsg.length){
        showError(errorMsg);
      }
    } catch (err) {
      showError(err);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false)
      // showLoading({ loading: false }); 
    }
  };


    const handleSubmit = async() => {
      try{
        if(openAddProduct){
            dispatch(addProduct(newProduct))
        }else{
          dispatch(addCategory(newCategory))
        }
      }catch(err){
        showError(err)
      }finally{
        setOpenAddCategory(false)
        setOpenAddProduct(false)
      }
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
    const handleChange = (key, value, type="product") => {
      console.log(key, value, type,":::::")
      if(type == 'product'){
          setNewProduct((prev) => ({
              ...prev,
              [key]: value, 
          }));
      }else{
        setNewCategory((prev) => ({
          ...prev,
          [key]: value, 
      }));
      }
    };

  return (
    <Box p={3}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
            <Typography variant="h4" gutterBottom>
                Category
            </Typography>
        </Box>
        <Box display={'flex'} gap={2}>
            <ThemeButton label = {'Product'} onClick={handleProduct} variant = 'primary'  icon={<AddIcon/>}/>
            <ThemeButton label = {'Category'} onClick={handleCategory} variant = 'primary'  icon={<AddIcon/>}/>
        </Box>
      </Box>
      {loading ? variants.map((variant) => (
            <Typography component="div" key={variant} variant={variant}>
              {loading && <Skeleton />}
            </Typography>
          ))
        :
        <>
          <Categories allCategories={allCategories} />
        </>
        }
            <CommonModal open={openAddProduct} handleClose={handleProductClose} handleSubmit={handleSubmit} header='Add Product' buttonTitle="Add">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField  
                        sx={{width:"100%"}}
                        onChange={(e)=>handleChange('productName', e.target.value)}
                        variant='outlined' label='Enter Product name' />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl sx={{width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">Select Category</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        // value={newProduct.category}
                        onChange={(e)=>handleChange('categoryId',e.target.value)}
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
                            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                        </Box>
                    </Grid>
                </Grid>
            </CommonModal>
            <CommonModal open={openAddCategory} handleClose={handleCategoryClose} handleSubmit={handleSubmit} header='Add Category' buttonTitle="Submit">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField sx={{width:"100%"}} onChange={(e)=>handleChange('category', e.target.value,'category')} variant='outlined' label='Enter Category name'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={'flex'} m={0} alignItems={'center'}>
                            <Typography mr={2}>Category Logo: </Typography>
                            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                        </Box>
                    </Grid>
                </Grid>
            </CommonModal>
    </Box>
  );
}
