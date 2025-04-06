import React, { useEffect } from 'react';
import { Box, Breadcrumbs, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategoryList } from '../../../store/redux/categoryThunk';
import Categories from './Categories';
import { useLoading } from '../../../Components/Common/LoadingIndicator';
import { showError, showSuccess } from '../../../Assets/Constants/showNotifier';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import ThemeButton from '../../../Components/Common/ThemeButton';
import CommonModal from '../../../Components/Common/CommonModal';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import ImageUploader from '../../../Components/Common/ImageUploader';
import CategoriesAccordions from './CategoriesAccordions';
import MediaUploader from '../../../Components/Common/MediaUploader';

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
export default function ProductList() {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.category.error); 
  const [loading, setLoading] = useState(false);
  const allCategories = useSelector((state) => state.category);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newCategory, setNewCategory] = React.useState({
      category:"",
      isParentCategory:false,
      parentCategory:null
  });

console.log("allCategories",allCategories); 
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true)
    try {
      await dispatch(getCategoryList());
      console.log("errorMsg",errorMsg);
      if(errorMsg && errorMsg.length){
        showError(errorMsg);
      }
    } catch (err) {
      showError(err);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false)
    }
  };

    const handleSubmit = async() => {
      try{
        const formData = new FormData();
        formData.append("data", JSON.stringify(newCategory));
        formData.append("media", selectedImage.file);
        dispatch(addCategory(formData))
        setSelectedImage(null);
      }catch(err){
        showError(err)
      }finally{
        setOpenAddCategory(false)
      }
    }
    const handleCategory = () => {
        setOpenAddCategory(true);
    }
    const handleCategoryClose = () => {
        setOpenAddCategory(false);
    }
    const handleChange = (key, value, type="product") => {
        setNewCategory((prev) => ({
          ...prev,
          [key]: value, 
      }));
    };
  return (
    <Box maxWidth={'1200px'} height={'100vh'} p={3}>
      <Box mb={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>Categories</Typography>
      </Breadcrumbs>
        <Box display={'flex'} gap={2}>
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
          <CategoriesAccordions/>
        </>
        }
          <CommonModal open={openAddCategory} handleClose={handleCategoryClose} handleSubmit={handleSubmit} header='Add Category' buttonTitle="Submit" startIcon ={<AddIcon/>}>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField sx={{width:"100%"}} onChange={(e)=>handleChange('category', e.target.value,'category')} variant='outlined' label='Enter Category name'/>
                  </Grid>
                  {allCategories.categories.length > 0 && 
                  <>
                    <Grid item xs={12}>
                        <FormControlLabel onChange={(e)=>handleChange('isParentCategory', e.target.checked,'category')} control={<Checkbox checked={newCategory.isParentCategory} />} label="Belongs to another category?" />
                    </Grid>
                    {newCategory.isParentCategory && 
                      <Grid item xs={12}>
                          <FormControl sx={{width: "100%" }}>
                              <InputLabel id="demo-multiple-name-label">Select Parent Category</InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={newCategory.parentCategory}
                                onChange={(e)=>handleChange('parentCategory',e.target.value, 'category')}
                                input={<OutlinedInput label="Select Parent Category" />}
                                MenuProps={MenuProps}
                                >
                              {allCategories.categories.map((category,idx) => (
                                  <MenuItem
                                  key={idx}
                                  value={category.id}
                                  >
                                  {category.name}
                                  </MenuItem>
                              ))}
                              </Select>
                          </FormControl>
                      </Grid>
                    }
                  </>
                  }
                  <Grid item xs={12}>
                      <Box display={'flex'} m={0} alignItems={'center'}>
                          <Typography mr={2}>Category Logo: </Typography>
                          <MediaUploader selectedMedia={selectedImage} setSelectedMedia={setSelectedImage}/>
                      </Box>
                  </Grid>
              </Grid>
          </CommonModal>
    </Box>
  );
}
