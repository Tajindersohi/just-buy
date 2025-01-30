import React, {  useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Product from "./Product";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoadingIndicator from "../../Components/Common/LoadingIndicator";
import { Products } from "../../Assets/Constants/ProductConstant";

const Home = () => {
  const product = Products
  // const product = useSelector((state) => state.product);
  const [cart,setCart] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

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
          // <Grid item xs={6} sm={4} md={3} lg={2.4} key={idx}>
          //   <Box
          //     sx={{
          //       position: "relative",
          //       textAlign: "center",
          //       border: "1px solid #ddd",
          //       borderRadius: "10px",
          //       transition:"height 2s",
          //       overflow: "hidden",
          //     }}
          //   >
          //     <Box
          //       sx={{
          //         backgroundImage: `url(${product.img})`,
          //         backgroundSize: "cover",
          //         width: "100%",
          //         height: "200px",
          //       }}
          //     />
          //     <Box mt={2} px={2} textAlign={'left'} >
          //       <Box minHeight={"60px"}>
          //         <Typography>{product.title}</Typography>

          //       </Box>
          //         <Typography textAlign={'left'} color="#6f7478">
          //           (22g)
          //         </Typography>
          //     </Box>
          //     <Box mx={2} mt={2}>
          //       <Typography textAlign="left"  color="#6f7478" sx={{ textDecoration: "line-through" }}>${product.totalPrice}</Typography>
          //       <Box display="flex" mb={2} gap={2} justifyContent="space-between" alignItems="center">
          //         <Typography >
          //         ${product.currentPrice}
          //         </Typography>
          //       {cart.length > 0 && cart.find((item) => item.id == product.id) && <Box>
          //         {cart.find((item) => item.id == product.id).count}
          //       </Box>}
          //         <Button
          //             size="small"
          //             variant="outlined"
          //             color='success'
          //             onClick={()=>handleAddItem(product.id)}
          //           >
          //             Add
          //           </Button>
          //       </Box>
          //     </Box>
          //   </Box>
          // </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
