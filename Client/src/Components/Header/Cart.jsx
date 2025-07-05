import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  Divider,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartProductItem,
  getCartDetails,
  removeCartProduct,
} from "../../store/redux/cartThunk";
import { showWarning } from "../../Assets/Constants/showNotifier";

export default function Cart({ open, setOpen, setModalType }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.user || state.user.user);

  useEffect(() => {
    if (open) {
      dispatch(getCartDetails(cart.items));
    }
  }, [open, dispatch]);

  const toggleDrawer = (status) => () => setOpen(status);

  const handleRemove = (id) => dispatch(removeCartProduct(id));

  const handleAdd = (id, count, max) => {
    if (count >= max) {
      showWarning("Limit Reached", "center", false);
      return;
    }
    dispatch(addCartProductItem(id));
  };

  const getCurrentPrice = (discount, price) =>
    (price - (discount * price) / 100).toFixed(2);

  const handleLogin = () => setModalType("phone");

  const renderCartItems = () => (
    <List sx={{ mt: 2, maxHeight: 300, overflowY: "auto" }}>
      {cart.items.map((item) => (
        <ListItem
          key={item._id}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            alignItems: "flex-start",
          }}
        >
          <Box>
            <img
              src={item.imageUrl}
              alt={item.name}
              width={50}
              height={50}
              style={{ borderRadius: 8, objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=80&q=80";
              }}
            />
          </Box>

          <Box ml={2} flexGrow={1}>
            <Typography fontWeight={500}>{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.weight}
            </Typography>
            <Typography fontWeight={700}>
              ₹{(item.count * getCurrentPrice(item.discount, item.price)).toFixed(2)}
            </Typography>
          </Box>

          <Chip
            color="success"
            sx={{ borderRadius: 1.5, height: 30 }}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  onClick={() => handleRemove(item._id)}
                  sx={{ cursor: "pointer", px: 1 }}
                >
                  –
                </Box>
                {item.count}
                <Box
                  onClick={() => handleAdd(item._id, item.count, item.maxCount)}
                  sx={{ cursor: "pointer", px: 1 }}
                >
                  +
                </Box>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  const renderBillDetails = () => (
    <Box
      mt={2}
      p={2}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        fontSize: { xs: 13, sm: 14 },
      }}
    >
      <Typography fontWeight={600}>Bill details</Typography>
      <Box display="flex" justifyContent="space-between">
        <span>Items total</span>
        <span>₹{cart.total_cost}</span>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <span>Delivery charge</span>
        <Box display="flex" alignItems="center">
          <span style={{ textDecoration: "line-through" }}>
            ₹{cart.delivery_charges}
          </span>
          <span style={{ color: theme.palette.success.main, marginLeft: 4 }}>
            FREE
          </span>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <span>Handling charge</span>
        <span>₹{cart.handeling_charges}</span>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" fontWeight="bold">
        <span>Grand total</span>
        <span>₹{cart.total_cost}</span>
      </Box>
    </Box>
  );

  const renderActionButton = () => (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        mt: 2,
        backgroundColor: theme.palette.background.paper,
        p: 2,
      }}
    >
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={!isAuthenticated ? handleLogin : undefined}
        sx={{ fontSize: { xs: 14, sm: 16 }, borderRadius: 2 }}
      >
        {!isAuthenticated
          ? `Login to Proceed ₹${cart.total_cost}`
          : "Proceed to Payment"}
      </Button>
    </Box>
  );

  const renderEmpty = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      textAlign="center"
      mt={5}
    >
      <Typography color="text.secondary">Your Cart is empty</Typography>
    </Box>
  );

  const renderCart = () => (
    <Box
      sx={{
        p: 2,
        bgcolor: theme.palette.background.paper,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          My Cart
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CancelRoundedIcon />
        </IconButton>
      </Box>

      {cart.isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : cart.items.length > 0 ? (
        <>
          {renderCartItems()}
          {renderBillDetails()}
          {renderActionButton()}
        </>
      ) : (
        renderEmpty()
      )}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 400 },
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {renderCart()}
    </SwipeableDrawer>
  );
}
