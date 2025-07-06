import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  SwipeableDrawer,
  IconButton,
  List,
  Divider,
  Chip,
  useTheme,
  Skeleton,
  Paper,
  Stack,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails } from "../../store/redux/cartThunk";
import { showWarning } from "../../Assets/Constants/showNotifier";
import { addProduct, removeProduct } from "../../store/redux/cartslice";

export default function Cart({ open, setOpen, setModalType }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.user || state.user.user);

  useEffect(() => {
    if (open) {
      dispatch(getCartDetails());
    }
  }, [open, dispatch]);

  const toggleDrawer = (status) => () => setOpen(status);

  const handleAdd = (product, count, max) => {
    if (count >= max) {
      showWarning("Limit Reached", "center", false);
      return;
    }
    dispatch(addProduct(product));
    dispatch(getCartDetails());
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
    dispatch(getCartDetails());
  };

  const getCurrentPrice = (discount, price) => (price - (discount * price) / 100).toFixed(2);

  const handleLogin = () => setModalType("phone");

  const renderCartItems = () => (
    <List sx={{ mt: 2, maxHeight: 360, overflowY: "auto" }}>
      {cart.items.map((item) => {
        const unitPrice = getCurrentPrice(item.discount, item.price);
        return (
          <Paper
            key={item._id}
            elevation={1}
            sx={{ mb: 1.5, px: 1.5, py: 1, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  style={{ borderRadius: 10, objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=80&q=80";
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={600} fontSize={14}>{item.name}</Typography>
                <Typography variant="caption" color="text.secondary">{item.weight}</Typography>
                <Typography fontSize={12.5} fontWeight={500} color="text.primary" mt={0.5}>
                  ₹{unitPrice} × {item.count} = <strong>₹{(item.count * unitPrice).toFixed(2)}</strong>
                </Typography>
              </Box>
            </Stack>
            <Chip
              variant="outlined"
              sx={{ height: 30, borderRadius: 2, fontSize: 13, px: 1.2 }}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <Box onClick={() => handleRemove(item._id)} sx={{ cursor: "pointer", fontWeight: 700 }}>–</Box>
                  <Typography variant="body2" fontWeight={600}>{item.count}</Typography>
                  <Box onClick={() => handleAdd(item, item.count, item.maxCount)} sx={{ cursor: "pointer", fontWeight: 700 }}>+</Box>
                </Box>
              }
            />
          </Paper>
        );
      })}
    </List>
  );

  const renderSkeletons = () => (
    <List sx={{ mt: 2 }}>
      {[...Array(3)].map((_, idx) => (
        <Paper
          key={idx}
          sx={{ mb: 1.5, px: 1.5, py: 1.2, borderRadius: 2 }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Skeleton variant="rectangular" width={60} height={60} sx={{ borderRadius: 1.5 }} />
            <Box flexGrow={1}>
              <Skeleton variant="text" width="60%" height={22} />
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="80%" height={18} />
            </Box>
          </Box>
        </Paper>
      ))}
    </List>
  );

  const renderBillDetails = () => (
    <Paper elevation={1} sx={{ mt: 2, p: 1.5, borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Bill Details
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={1} fontSize={13}>
        <span>Items Total</span>
        <span>₹{cart.total_cost}</span>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1} fontSize={13}>
        <span>Delivery Charges</span>
        <Box display="flex" alignItems="center">
          <span style={{ textDecoration: "line-through" }}>₹{cart.delivery_charges}</span>
          <span style={{ color: theme.palette.success.main, marginLeft: 6 }}>FREE</span>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1} fontSize={13}>
        <span>Handling Charges</span>
        <span>₹{cart.handeling_charges}</span>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" fontWeight={600} fontSize={14}>
        <span>Grand Total</span>
        <span>₹{cart.total_cost}</span>
      </Box>
    </Paper>
  );

  const renderActionButton = () => (
    <Box sx={{ position: "sticky", bottom: 0, mt: 1, backgroundColor: theme.palette.background.paper, p: 2 }}>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={!isAuthenticated ? handleLogin : undefined}
        sx={{ fontSize: { xs: 14, sm: 16 }, borderRadius: 3, py: 1.5, boxShadow: 2 }}
      >
        {!isAuthenticated ? `Login to Proceed ₹${cart.total_cost}` : "Proceed to Payment"}
      </Button>
    </Box>
  );

  const renderEmpty = () => (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} textAlign="center" mt={5}>
      <Typography color="text.secondary" variant="body1">Your cart is empty</Typography>
    </Box>
  );

  const renderCart = () => (
    <Box sx={{ p: 2, bgcolor: theme.palette.background.paper, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>My Cart</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CancelRoundedIcon />
        </IconButton>
      </Box>

      {cart.isLoading ? (
        renderSkeletons()
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
          width: { xs: "100vw", sm: 420 },
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {renderCart()}
    </SwipeableDrawer>
  );
}