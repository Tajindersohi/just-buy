import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import Product from './Product';

const CategoryProduct = ({ list, handleAddItem, handleSubItem }) => {
  return (
    <Box>
      {list.categoryWithProduct?.map((item, idx) =>
        item.products?.length > 0 ? (
          <Box key={idx} my={4}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
              {item.name}
            </Typography>
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
