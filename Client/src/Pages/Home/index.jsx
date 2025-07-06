import React, { useEffect, useRef, useState } from "react";
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
import apiConstants from "../../api/Constants";
import Product from "./Product";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const productsss = useSelector((state) => state.home);
  const errorMsg = useSelector((state) => state.product.error);
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const skipSuggestionRef = useRef(false);

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

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults();

        // Only fetch suggestions if not triggered by click
        if (!skipSuggestionRef.current) {
          fetchSuggestions(searchQuery);
        }

        // Reset the flag after execution
        skipSuggestionRef.current = false;
      } else {
        setSearchResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


  const fetchSearchResults = async () => {
    try {
      setSearchLoading(true);
      const res = await apiConstants.home.searchHome(encodeURIComponent(searchQuery));
      setSearchResults(res.data?.products || []);
    } catch (error) {
      console.error("Search API failed", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSuggestionClick = (item) => {
    skipSuggestionRef.current = true;  // prevent suggestion fetch
    setSearchQuery(item.name);
    setSearchResults([item]);
    setSuggestions([]);
    setShowSearchResult(true);
  };

  const fetchSuggestions = async (input) => {
    try {
      const res = await apiConstants.home.searchSuggestion(input);
      if (res.data.success) {
        setSuggestions(res.data.suggestions);
      }
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };

  return (
    <Box py={2} position="relative">
      <Box maxWidth="600px" mx="auto" px={2} mb={4} mt={1}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setShowSearchResult(true)}
          // onFocusRemove={() => setShowSearchResult(false)}
          suggestions={suggestions}
          showSuggestions={searchQuery.trim().length > 0 && !searchLoading}
          onSuggestionClick={handleSuggestionClick}
        />  
      </Box>

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
                  <Product handleAddItem={handleAddItem} handleSubItem={handleSubItem} product={product}/>
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
