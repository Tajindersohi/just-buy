import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ThemeButton from "../../../Components/Common/ThemeButton";
import CommonModal from "../../../Components/Common/CommonModal";
import ImageUploader from "../../../Components/Common/ImageUploader";
import { showError } from "../../../Assets/Constants/showNotifier";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import { addProduct } from "../../../store/redux/categoryThunk";
import ProductsGrid from "./ProductsGrid";
import { getProductsList } from "../../../store/redux/productThunk";
const variants = ['h1', 'h3', 'body1', 'caption'];

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const productList = useSelector((state)=>state.product);
  const [newProduct, setNewProduct] = React.useState({
    categoryId:id,
    productName:"",
    price:0,
    imageUrl:selectedImage,
    discount:0 
});

console.log("productListproductList",productList);
useEffect(()=>{
  getProducts();
},[])

const getProducts = async() => {
  await dispatch(getProductsList({id:id}))
}
  useEffect(() => {
    if(openAddProduct){
      setNewProduct((prev) => ({
          ...prev,
          imageUrl: selectedImage, 
      }));
    }
  }, [selectedImage]);

    const handleSubmit = async() => {
      try{
            dispatch(addProduct(newProduct))
      }catch(err){
        showError(err)
      }finally{
        setOpenAddProduct(false)
        getProducts()
      }
    }

    const handleProduct = () => {
      setOpenAddProduct(true);
    }
    const handleProductClose = () => {
        setOpenAddProduct(false);
    }

    const handleChange = (key, value, type="product") => {
          setNewProduct((prev) => ({
              ...prev,
              [key]: value, 
          }));
    };
  return (
    <Box maxWidth={'1200px'} p={3}>

      <Box mb={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
            <h1>Products</h1>
        </Box>
        <Box display={'flex'} gap={2}>
            <ThemeButton label = {'Product'} onClick={handleProduct} variant = 'primary'  icon={<AddIcon/>}/>
        </Box>
      </Box>
      <CommonModal open={openAddProduct} handleClose={handleProductClose} handleSubmit={handleSubmit} header='Add Product' buttonTitle="Add">
          <Grid container spacing={1}>
              <Grid item xs={6}>
                  <TextField  
                  sx={{width:"100%"}}
                  onChange={(e)=>handleChange('productName', e.target.value)}
                  variant='outlined' label='Enter Product name' />
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
      <ProductsGrid list={productList.products}/>
    </Box>
  );
}

export default ProductDetails;
