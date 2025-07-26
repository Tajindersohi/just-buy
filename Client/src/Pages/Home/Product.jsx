import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { showWarning } from "../../Assets/Constants/showNotifier";

const Product = ({ product, handleAddItem, handleSubItem }) => {
  const [productCount, setProductCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const theme = useTheme();

  useEffect(() => {
    const added = cartItems.items.find((item) => item._id === product._id);
    setProductCount(added ? added.count : 0);
  }, [cartItems, product._id]);

  const getCurrentPrice = (discount, total) =>
    (total - (discount * total) / 100).toFixed(2);

  const handleAdd = (product) => {
    if (productCount >= product.maxCount) {
      showWarning("Limit Reached", "center", false);
      return;
    }
    handleAddItem(product);
  };

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card
        elevation={2}
        sx={{
          bgcolor: "#00b1500a",
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: theme.shadows[1],
          height: "100%",
          "&:hover": {
            // transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardActionArea disableRipple sx={{ p: 0, pb: 0 }}>
          <Box
            sx={{
              height: isMobile ? 100 : isTablet ? 130 : 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {!imageLoaded && <Skeleton variant="rectangular" width="100%" height="100%" />}
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzM0ODN8MHwxfHNlYXJjaHwxfHxHcmFwZXN8ZW58MHwwfHx8MTc0NjI4OTY3NHww&ixlib=rb-4.0.3&q=80&w=400';
                  setImageLoaded(true);
                }}
                sx={{
                  display: imageLoaded ? "block" : "none",
                  objectFit: "contain",
                  maxHeight: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

            {product.discount >= 10 && (
              <Chip
                label={`${product.discount}% OFF`}
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  fontSize: "10px",
                }}
              />
            )}
          </Box>

          <CardContent sx={{ px: 1, pt: 1, pb: 1 }}>
            <Box display={{xs:'flex',md:'block'}} alignItems={'center'} gap={1} justifyContent={'start'}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  color="text.primary"
                >
                  {product.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {product.quantity || "100g"}
                </Typography>
            </Box>

            <Box mt={0.5} display={'flex'} gap={2} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={{xs:'block',sm:'flex'}} justifyContent={'start'} gap={1}>
                  {product.discount > 0 && (
                    <Typography
                      variant="caption"
                      sx={{ textDecoration: "line-through", color: theme.palette.text.secondary }}
                    >
                      ₹{product.price}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                  >
                    ₹{getCurrentPrice(product.discount, product.price)}
                  </Typography>
              </Box>
              <Box>
                {productCount > 0 ? (
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: "13px",
                      borderRadius: "20px",
                      textTransform: "none",
                      py: 0.6,
                      backgroundColor: theme.palette.success.main,
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: theme.palette.success.main,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                      <Box
                        onClick={() => handleSubItem(product._id)}
                        sx={{ px: 1.5, cursor: "pointer" }}
                      >
                        −
                      </Box>
                      {productCount}
                      <Box
                        onClick={() => handleAdd(product)}
                        sx={{ px: 1.5, cursor: "pointer" }}
                      >
                        +
                      </Box>
                    </Box>
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => handleAdd(product)}
                    sx={{
                      fontSize: "13px",
                      borderRadius: "20px",
                      textTransform: "none",
                      py: 0.6,
                    }}
                  >
                    Add
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>

      </Card>
    </Grid>
  );
};

export default Product;
