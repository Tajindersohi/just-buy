import React, { useState } from "react";
import { Box, Button, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const [showButton, setShowButton] = useState(null);
  const product = useSelector((state) => state.product);
  const handleMouseEnter = (id) => {
    setShowButton(id);
  };
  const handleMouseLeave = () => {
    setShowButton(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Category
      </Typography>
      <Box display="flex" gap={5} overflowX="scroll">
        {product.categories.map((category, idx) => (
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
      </Box>

      <Typography variant="h4" gutterBottom mt={4}>
        Best Selling Products
      </Typography>
      <Grid container spacing={3}>
        {product.bestSellingProducts.map((product, idx) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={idx}>
            <Box
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              sx={{
                position: "relative",
                textAlign: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${product.img})`,
                  backgroundSize: "cover",
                  width: "100%",
                  height: "200px",
                }}
              />
              <Box mt={1} px={2}>
                <Typography>{product.title}</Typography>
                <Box mt={1} display="flex" alignItems="center" justifyContent="center">
                  <Rating name="size-small" defaultValue={2} size="small" />
                  <Typography pl={1} color="#6f7478">
                    (222)
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" mt={1} justifyContent="center" alignItems="center">
                <Typography color="#6f7478" sx={{ textDecoration: "line-through" }}>
                  ${product.totalPrice}
                </Typography>
                <Typography pl={2}>${product.currentPrice}</Typography>
                <Chip sx={{ ml: 1, borderRadius: "0px" }} label="10% OFF" variant="outlined" />
              </Box>
              {showButton === idx && (
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
