import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../Assets/Constants/showNotifier";
import { getHomeDetails } from "../../store/redux/homeThunk";
import { showLoading } from "../../Assets/Constants/showLoading";
import ImageSlider from "../../Components/Common/ImageSlider";
import SearchBar from "../../Components/Common/SearchBar";
import { getMe } from "../../store/redux/thunks";
import { addCartProductItem, removeCartProduct } from "../../store/redux/cartThunk";
import ProductSkeleton from "../../Components/Common/ProductSkeleton";
import CategorySkeleton from "../../Components/Common/CategorySkeleton";
import CategoryProduct from "./CategoryProduct";
import Product from "./Product";
import { useSearch } from "../../context/SearchContext";

const Home = () => {
  const dispatch = useDispatch();
  const productsss = useSelector((state) => state.home);
  const errorMsg = useSelector((state) => state.product.error);

  const {
    searchQuery,
    showSearchResult,
    searchResults,
    searchLoading,
  } = useSearch();

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

  const handleAddItem = (product) => dispatch(addCartProductItem(product));
  const handleSubItem = (id) => dispatch(removeCartProduct(id));

  return (
    <Box py={2} position="relative">
      {isMobile && 
      <Box maxWidth="600px" mx="auto" px={2} mb={4} mt={1}>
        <SearchBar />
      </Box>
      }

      {!showSearchResult && (
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
            color="primary"
            sx={{ letterSpacing: 0.5 }}
          >
            Just Buy – Get It Now!
          </Typography>
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
        </>
      )}

      {showSearchResult && (
        <Box px={2} py={3}>
          {searchQuery.trim() && (
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Showing results for "{searchQuery}"
            </Typography>
          )}
          {searchLoading ? (
            <ProductSkeleton count={4} />
          ) : searchResults.length > 0 ? (
            <Grid container spacing={2}>
              {searchResults.map((product) => (
                <Product
                  key={product._id}
                  handleAddItem={handleAddItem}
                  handleSubItem={handleSubItem}
                  product={product}
                />
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {searchQuery && showSearchResult && "No products found."}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
