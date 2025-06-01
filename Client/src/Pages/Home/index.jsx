import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../Assets/Constants/showNotifier";
import { getHomeDetails } from "../../store/redux/homeThunk";
import { showLoading } from "../../Assets/Constants/showLoading";
import ImageSlider from "../../Components/Common/ImageSlider";
import { getMe } from "../../store/redux/thunks";
import { addCartProductItem, removeCartProduct } from "../../store/redux/cartThunk";
import ProductSkeleton from "../../Components/Common/ProductSkeleton";
import CategoryProduct from "./CategoryProduct";

const Home = () => {
  const productsss = useSelector((state) => state.home);
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const errorMsg = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    getList();
  }, []);

  const getList = async () => {
    let interval;
    try {
      setProgress(0);
      showLoading(true, "linear", 0);

      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev < 90 ? prev + 5 : prev;
          showLoading(true, "linear", newProgress);
          return newProgress;
        });
      }, 300);

      await dispatch(getHomeDetails());

      if (errorMsg?.length) showError(errorMsg);

      clearInterval(interval);
      setProgress(100);
      showLoading(true, "linear", 100);
    } catch (err) {
      showError(err);
      console.error("Error fetching products:", err);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        showLoading(false, "linear", 0);
      }, 500);
    }
  };

  const handleAddItem = (id) => {
    dispatch(addCartProductItem(id));
  };

  const handleSubItem = (id) => {
    dispatch(removeCartProduct(id));
  };

  return (
    <Box>
      <Typography my={2} fontWeight={700} variant="h5">
        Category
      </Typography>

      {progress !== 100 ? (
        <>
          <Box display="flex" gap={2}>
            {Array.from({ length: isMobile ? 2 : 8  }, (_, i) => (
              <Box
                key={i}
                width={145}
                border="1px solid #ddd"
                borderRadius={'50%'}
                boxShadow={1}
                height="145px"
                >
              <Skeleton
                key={i}
                variant="circular"
                width="145px"
                height="145px"
              />
              </Box>
            ))}
          </Box>
          <Box py={4}>
            <Skeleton variant="text" width="20%" height={24} />
          </Box>
          <Box py={1}>
            <ProductSkeleton count={6} />
          </Box>
        </>
      ) : (
        <>
          <ImageSlider categories={productsss.categories} />
          <CategoryProduct list={productsss} handleAddItem={handleAddItem} handleSubItem={handleSubItem}/>
        </>
      )}
    </Box>
  );
};

export default Home;
