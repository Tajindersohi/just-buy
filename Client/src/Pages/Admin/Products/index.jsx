import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../../../store/redux/productThunk';
import Categories from './Categories';
import { useLoading } from '../../../Components/Common/LoadingIndicator';
import { showError } from '../../../Assets/Constants/showNotifier';

export default function ProductList() {
  const dispatch = useDispatch();
  const { showLoading } = useLoading();
  const errorMsg = useSelector((state) => state.product.error); 
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    showLoading({ loading: true }); // Show loading spinner
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
      showLoading({ loading: false }); // Hide loading spinner
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Categories />
    </Box>
  );
}
