import { Grid, Typography } from '@mui/material';
import React from 'react'
import Product from './Product';

const CategoryProduct = ({list, handleAddItem,handleSubItem}) => {
  return (
    <div>
        {list.categoryWithProduct.map((item,idx) => {
           return (
            item.products.length > 0 ? 
                <>
                    <Typography variant="h5" gutterBottom mt={4}>
                        <b>{item.name}</b>
                    </Typography>
                    <Grid container spacing={3}>
                    {item.products.map((product, idx) => (
                        <Product key={idx} product={product} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
                    ))}
                    </Grid>
                </>
                :
                <>
                </>
            )
        })}
    </div>
  )
}

export default CategoryProduct
