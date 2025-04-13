import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { showError, showInfo, showWarning } from "../../Assets/Constants/showNotifier";

const Product = ({ product, handleAddItem, handleSubItem }) => {
  const [productCount, setProductCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    const addedProduct = cartItems.items.find((item) => item._id === product._id);
    setProductCount(addedProduct ? addedProduct.count : 0);
  }, [cartItems]);
  const getCurrentPrice = (discount, total) => (total - (discount * total) / 100).toFixed(2);

  const handleAdd = (id) => {
    if(productCount >= product.maxCount){
      showWarning("Limit Reached", 'center', false);
      return;
    }
    handleAddItem(id)
  } 
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} key={product._id}>
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "10px",
          cursor: "pointer",
          overflow: "hidden",
          padding: 1.5,
          backgroundColor: "#fff",
          maxHeight: isMobile ? "220px" : isTablet ? "250px" : "280px",
          maxWidth: isMobile ? "180px" : isTablet ? "200px" : "200px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "100px" : isTablet ? "120px" : "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: "10px" }}
            />
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              display: imageLoaded ? "block" : "none",
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </Box>

        <Box mt={1} px={1} textAlign="left">
          <Typography fontSize={isMobile ? "12px" : "14px"} fontWeight="bold" noWrap>
            {product.name.length <= 30 ? product.name : `${product.name.substring(0, 30)}...`}
          </Typography>
          <Typography fontSize="12px" color="#6f7478">
            {product.quantity || "(22g)"}
          </Typography>
        </Box>

        <Box mx={1} mt={1}>
          <Box display="flex" justifyContent="left" alignItems="center">
          <Typography fontSize="12px" color="#6f7478" sx={{ textDecoration: "line-through" }}>
            ${product.price}
          </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontSize="14px">${getCurrentPrice(product.discount, product.price)}</Typography>
            {productCount > 0 ? (
              <Chip
                sx={{ borderRadius: "5px", fontSize: "12px", px: 1 }}
                color="success"
                label={
                  <Box display="flex" gap={1} alignItems="center">
                    <Box onClick={() => handleSubItem(product._id)} sx={{ cursor: "pointer", px: 1 }}>
                      -
                    </Box>
                    {productCount}
                    <Box onClick={() => handleAdd(product._id)} sx={{ cursor: "pointer", px: 1 }}>
                      +
                    </Box>
                  </Box>
                }
              />
            ) : (
              <Button size="small" variant="outlined" color="success" sx={{ fontSize: "12px" }} onClick={() => handleAddItem(product._id)}>
                Add
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Product;
