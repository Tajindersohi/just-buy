import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
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
  const { showLoading } = useLoading();
  const errorMsg = useSelector((state) => state.category.error); 
  const [loading, setLoading] = useState(false);
  const allCategories = useSelector((state) => state.category);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newCategory, setNewCategory] = React.useState({
      category:"",
      imageUrl:selectedImage,
      isParentCategory:false,
      parentCategory:null
  });

console.log("allCategories",allCategories); 
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
      setNewCategory((prev) => ({
          ...prev,
          imageUrl: selectedImage, 
      }));
  }, [selectedImage]);

  const getList = async () => {
    setLoading(true)
    // showLoading({ loading: true }); 
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
          dispatch(addCategory(newCategory))
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
    <Box maxWidth={'1200px'} p={3}>
      <Box mb={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
            <Typography variant="h5" gutterBottom>
                Categories
            </Typography>
        </Box>
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
          <Categories />
        </>
        }
          <CommonModal open={openAddCategory} handleClose={handleCategoryClose} handleSubmit={handleSubmit} header='Add Category' buttonTitle="Submit">
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField sx={{width:"100%"}} onChange={(e)=>handleChange('category', e.target.value,'category')} variant='outlined' label='Enter Category name'/>
                  </Grid>
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
