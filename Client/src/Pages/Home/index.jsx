import React, {  useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoadingIndicator, { useLoading } from "../../Components/Common/LoadingIndicator";
import { Products } from "../../Assets/Constants/ProductConstant";
import { getProductsList } from "../../store/redux/productThunk";
import { showError } from "../../Assets/Constants/showNotifier";
import { useEffect } from "react";

const Home = () => {
  const product = Products
  const { showLoading } = useLoading();
  // const product = useSelector((state) => state.product);
  const [cart,setCart] = useState([]);
  const errorMsg = useSelector((state) => state.product.error); 
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    showLoading({ loading: true }); 
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
      showLoading({ loading: false }); 
    }
  };
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, product.categories.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
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
          <LoadingIndicator/>

      <Typography variant="h4" gutterBottom>
        Category
      </Typography>
      <Box display="flex" flexDirection="row" sx={{overFlow:"overlay"}} gap={3}>
        <Button  onClick={handlePrev} disabled={startIndex === 0} size="small">
          <ArrowBackIosIcon/>
        </Button>
      {product.categories.slice(startIndex, startIndex + itemsPerPage).map((category, idx) => (
          <Box key={idx} display="flex" alignItems="center" flexDirection="column" gap={2}>
            <Box
              borderRadius="50%"
              sx={{
                backgroundImage: `url(${category.img})`,
                backgroundSize: "cover",
                width: "150px",
                height: "150px",
              }}
            />
            <Typography>{category.title}</Typography>
          </Box>
        ))}
        
        <Button
          size="small"
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= product.categories.length}
        >
        <ArrowForwardIosIcon/>
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom mt={4}>
        Best Selling Products
      </Typography>
      <Grid container spacing={3}>
        {product.bestSellingProducts.map((product, idx) => (
          <Product key={idx} product={product} cart={cart} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
