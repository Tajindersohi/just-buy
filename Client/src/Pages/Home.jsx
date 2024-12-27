// Home.js
import React, { useState } from "react";
import { Box, Button, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import fruitImg from "../Components/Images/fruits.jpg";
import beveragesImg from "../Components/Images/beveragesImg.jpg";
import eggImg from "../Components/Images/eggImg.jpg";
import breadImg from "../Components/Images/breadsImg.jpg";
import meatImg from "../Components/Images/meatImg.jpg";
import natureImg from "../Components/Images/natureImg.jpg";
import product1 from "../Components/Images/product1.png";
import product2 from "../Components/Images/product2.png";

const categories = [
  { title: "Fruits & Veges", img: fruitImg },
  { title: "Bread & Sweets", img: breadImg },
  { title: "Beverages", img: beveragesImg },
  { title: "Meat Products", img: meatImg },
  { title: "Breads", img: breadImg },
  { title: "Fruits & Veges", img: eggImg },
  { title: "Breads", img: beveragesImg },
  { title: "Breads", img: natureImg },
];

const bestSellingProducts = [
  { title: "Whole Wheat Sandwich Bread", img: product1, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Whole Grain Oatmeal", img: product2, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Sharp Cheddar Cheese Block", img: beveragesImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Organic Baby Spinach", img: meatImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Organic Spinach Leaves (Fresh Produce)", img: breadImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Fresh Salmon", img: eggImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Imported Italian Spaghetti Pasta", img: beveragesImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Granny Smith Apples", img: natureImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Organic 2% Reduced Fat Milk", img: natureImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
  { title: "Greek Style Plain Yogurt", img: natureImg, totalPrice: "24.00", currentPrice: "18.00", off: 10 },
];

const Home = () => {
  const [showButton, setShowButton] = useState(null);

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
        {categories.map((category, idx) => (
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
        {bestSellingProducts.map((product, idx) => (
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
