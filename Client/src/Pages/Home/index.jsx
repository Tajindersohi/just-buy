import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  Grid,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../Assets/Constants/showNotifier";
import { getHomeDetails } from "../../store/redux/homeThunk";
import { showLoading } from "../../Assets/Constants/showLoading";
import ImageSlider from "../../Components/Common/ImageSlider";
import { getMe } from "../../store/redux/thunks";
import { addCartProductItem, removeCartProduct } from "../../store/redux/cartThunk";
import ProductSkeleton from "../../Components/Common/ProductSkeleton";
import CategorySkeleton from "../../Components/Common/CategorySkeleton";
import CategoryProduct from "./CategoryProduct";

const Home = () => {
  const dispatch = useDispatch();
  const productsss = useSelector((state) => state.home);
  const errorMsg = useSelector((state) => state.product.error);
  const [progress, setProgress] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(getMe());
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    let interval;
    try {
      setProgress(0);
      showLoading(true, "linear", 0);

      interval = setInterval(() => {
        setProgress((prev) => {
          const updated = prev < 90 ? prev + 5 : prev;
          showLoading(true, "linear", updated);
          return updated;
        });
      }, 200);

      await dispatch(getHomeDetails());

      if (errorMsg?.length) showError(errorMsg);
      clearInterval(interval);
      setProgress(100);
      showLoading(true, "linear", 100);
    } catch (err) {
      console.error("Error fetching home details:", err);
      showError("Something went wrong.");
    } finally {
      clearInterval(interval);
      setTimeout(() => showLoading(false, "linear", 0), 500);
    }
  };

  const handleAddItem = (id) => dispatch(addCartProductItem(id));
  const handleSubItem = (id) => dispatch(removeCartProduct(id));

  return (
      <Box py={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          color="primary"
          sx={{ letterSpacing: 0.5 }}
        >
          Just Buy – Get It Now!
        </Typography>

        {/* Category Skeleton or Content */}
        {progress !== 100 ? (
          <>
            <CategorySkeleton count={isMobile ? 4 : 8} />
            <Box py={4}>
              <Skeleton variant="text" width="20%" height={24} />
            </Box>
            <ProductSkeleton count={isMobile ? 4 : 6} />
          </>
        ) : (
          <>
            <ImageSlider categories={productsss.categories} />

            <Divider sx={{ my: 4 }} />

            <CategoryProduct
              list={productsss}
              handleAddItem={handleAddItem}
              handleSubItem={handleSubItem}
            />
          </>
        )}
      </Box>
  );
};

export default Home;
