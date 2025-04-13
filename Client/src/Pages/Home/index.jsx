import React, {  useState } from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../Assets/Constants/showNotifier";
import { useEffect } from "react";
import { getHomeDetails } from "../../store/redux/homeThunk";
import { showLoading } from "../../Assets/Constants/showLoading";
import ImageSlider from "../../Components/Common/ImageSlider";
import { getMe } from "../../store/redux/thunks";
import CategoryProduct from "./CategoryProduct";
import { addCart, addCartProductItem, removeCartProduct } from "../../store/redux/cartThunk";

const Home = () => {
  const productsss = useSelector((state) => state.home);
  const [cart,setCart] = useState([]);
  const [progress ,setProgress] = useState(0);
  const errorMsg = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    getList();
  }, []);

  // useEffect(() => {
  //   dispatch(addCart(cart )); 
  // }, [cart, dispatch]); 

  const getList = async () => {
    let interval;
    try {
      setProgress(0);
      showLoading(true, "linear", 0); 
  
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev < 90 ? prev + 5 : prev; 
          showLoading(true, "linear", newProgress);
          return newProgress;
        });
      }, 300);
  
      await dispatch(getHomeDetails()); 
  
      if (errorMsg && errorMsg.length) {
        showError(errorMsg);
      }
  
      clearInterval(interval); 
      setProgress(100);
      showLoading(true, "linear", 100); 
    } catch (err) {
      showError(err);
      console.error("Error fetching products:", err);
    } finally {
      clearInterval(interval); 
      setTimeout(() => {
        showLoading(false, "linear", 0); 
      }, 500);
    }
  };

  const handleAddItem = (id) => {
    dispatch(addCartProductItem(id))
  };
  
  const handleSubItem = (id) => {
    dispatch(removeCartProduct(id))
  };
  
  
  return (
    <Box>
      <Typography variant="h5" disableGutterBottom>
        <b>Category</b>
      </Typography>
      {progress != 100 && <Grid container spacing={2}>
        {Array.from({ length:5 }, (_, i) => i).map((product, idx) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={product._id}>
            <Skeleton
            variant="circular"
            width="200px"
            height="200px"
          />
          </Grid>
        ))}
        </Grid>
      }
      <ImageSlider categories={productsss.categories}/>
      {progress != 100 && <Grid container spacing={3}>
        {Array.from({ length: 20 }, (_, i) => i).map((product, idx) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={product._id}>
            <Skeleton
            variant="rectangular"
            width="200px"
            height="200px"
            sx={{ borderRadius: "10px" }}
          />
          </Grid>
        ))}
        </Grid>
      }
      <CategoryProduct list={productsss} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
      {/* <Grid container spacing={3}>
        {productsss.products.map((product, idx) => (
          <Product key={idx} product={product} cart={cart} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
        ))}
      </Grid> */}
    </Box>
  );
};

export default Home;
