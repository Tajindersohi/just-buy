import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

const Product = ({product,handleAddItem,cart,handleSubItem}) => {
const [productCount,setProductCount] = useState(0);

useEffect(()=>{
  let addedProduct =  cart.find((item) => item.id === product.id)
  if(addedProduct){
    setProductCount(addedProduct.count);
  }else{
    setProductCount(0);
  }
},[cart])

  return (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={product.id}>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                transition:"height 2s",
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
              <Box mt={2} px={2} textAlign={'left'} >
                <Box minHeight={"60px"}>
                  <Typography>{product.title}</Typography>

                </Box>
                  <Typography textAlign={'left'} color="#6f7478">
                    (22g)
                  </Typography>
              </Box>
              <Box mx={2} mt={2}>
                <Typography textAlign="left"  color="#6f7478" sx={{ textDecoration: "line-through" }}>${product.totalPrice}</Typography>
                <Box display="flex" mb={2} gap={2} justifyContent="space-between" alignItems="center">
                  <Typography >
                  ${product.currentPrice}
                  </Typography>
                {productCount> 0 ? <Box>
                    <Chip sx={{borderRadius: "5px" }} Filled color="success" label={<Typography display={'flex'} gap={1}><Box  onClick={()=>handleSubItem(product.id)} sx={{cursor:'pointer'}}>-</Box>{productCount}<Box onClick={()=>handleAddItem(product.id)} sx={{cursor:'pointer'}}>+</Box></Typography>} />
                </Box>
                :
                  <Button
                      size="small"
                      variant="outlined"
                      color='success'
                      onClick={()=>handleAddItem(product.id)}
                    >
                      Add
                    </Button>
                }
                </Box>
              </Box>
            </Box>
          </Grid>
  );
};

export default Product;
