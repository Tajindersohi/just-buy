import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import Product from './Product';

const CategoryProduct = ({ list, handleAddItem, handleSubItem }) => {
  return (
    <Box>
      {list.categoryWithProduct?.map((item, idx) =>
        item.products?.length > 0 ? (
          <Box key={idx} my={4}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: "primary.main",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                  position: "relative",
                  display: "inline-block",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                  '&::after': {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    width: "50%",
                    height: "4px",
                    backgroundColor: "primary.main",
                    borderRadius: 2,
                  },
                }}
              >
                {item.name}
              </Typography>
            </Box>
            <Grid container spacing={2} rowGap={3}>
              {item.products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  handleAddItem={handleAddItem}
                  handleSubItem={handleSubItem}
                />
              ))}
            </Grid>
          </Box>
        ) : null
      )}
    </Box>
  );
};

export default CategoryProduct;
