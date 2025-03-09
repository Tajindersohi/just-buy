import React, {  useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { showError } from "../../Assets/Constants/showNotifier";
import { useEffect } from "react";
import { getHomeDetails } from "../../store/redux/homeThunk";
import { showLoading } from "../../Assets/Constants/showLoading";
import ImageSlider from "../../Components/Common/ImageSlider";
import { addToCart } from "../../store/redux/authSlice";
import { getMe } from "../../store/redux/thunks";

const Home = () => {
  const productsss = useSelector((state) => state.home);
  const [cart,setCart] = useState([]);
  const [progress ,setProgress] = useState(0);
  const userState = useSelector((state) => state.user);
  const errorMsg = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    getList();
  }, []);

  useEffect(() => {
    dispatch(addToCart({ cart })); 
  }, [cart, dispatch]); 

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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { id, count: 1 }];
      }
    });
  };
  
  const handleSubItem = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
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
      <Typography variant="h5" gutterBottom mt={4}>
        <b>Best Selling Products</b>
      </Typography>
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
      <Grid container spacing={3}>
        {productsss.products.map((product, idx) => (
          <Product key={idx} product={product} cart={cart} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
