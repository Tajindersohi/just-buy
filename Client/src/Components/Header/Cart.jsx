import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import ThemeButton from "../Common/ThemeButton";
import {
  addCartProductItem,
  getCartDetails,
  removeCartProduct,
} from "../../store/redux/cartThunk";
import { showWarning } from "../../Assets/Constants/showNotifier";

export default function Cart({ open, setOpen, modalType, setModalType }) {
  const cartItems = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    dispatch(getCartDetails(cartItems.items));
  }, [refetchTrigger]);

  const toggleDrawer = (status) => () => setOpen(status);

  const removeItem = async (id) => {
    await dispatch(removeCartProduct(id));
    setRefetchTrigger((prev) => !prev);
  };

  const addItem = async (id, count, max) => {
    if (count >= max) {
      showWarning("Limit Reached", "center", false);
      return;
    }
    await dispatch(addCartProductItem(id));
    setRefetchTrigger((prev) => !prev);
  };

  const getCurrentPrice = (discount, total) =>
    (total - (discount * total) / 100).toFixed(2);

  const handleLogin = () => setModalType("phone");

  const cartList = () => (
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

      {cartItems.items.length > 0 ? (
        <>
          <List sx={{ mt: 2, maxHeight: 300, overflowY: "auto" }}>
            {cartItems.items.map((item) => {
              const cartItem = cartItems.items.find((i) => i._id === item._id);
              if (!cartItem) return null;
              return (
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
                      alt={cartItem.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: 8, objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1537640538966-79f369143f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzM0ODN8MHwxfHNlYXJjaHwxfHxHcmFwZXN8ZW58MHwwfHx8MTc0NjI4OTY3NHww&ixlib=rb-4.0.3&q=80&w=400";
                      }}
                    />
                  </Box>
                  <Box ml={2} flexGrow={1}>
                    <Typography fontWeight={500}>{cartItem.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.weight}
                    </Typography>
                    <Typography fontWeight={700}>
                      ₹
                      {(
                        cartItem.count *
                        getCurrentPrice(item.discount, item.price)
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                  <Chip
                    color="success"
                    sx={{ borderRadius: 1.5, height: 30 }}
                    label={
                      <Box display="flex" gap={1} alignItems="center">
                        <Box
                          onClick={() => removeItem(item._id)}
                          sx={{ cursor: "pointer", px: 1 }}
                        >
                          -
                        </Box>
                        {cartItem.count}
                        <Box
                          onClick={() =>
                            addItem(item._id, cartItem.count, item.maxCount)
                          }
                          sx={{ cursor: "pointer", px: 1 }}
                        >
                          +
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>

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
              <span>₹{cartItems.total_cost}</span>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <span>Delivery charge</span>
              <Box display="flex" alignItems="center">
                <span style={{ textDecoration: "line-through" }}>
                  ₹{cartItems.delivery_charges}
                </span>
                <span style={{ color: theme.palette.success.main, marginLeft: 4 }}>
                  FREE
                </span>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <span>Handling charge</span>
              <span>₹{cartItems.handeling_charges}</span>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" fontWeight="bold">
              <span>Grand total</span>
              <span>₹{cartItems.total_cost}</span>
            </Box>
          </Box>

          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              mt: 2,
              backgroundColor: theme.palette.background.paper,
              p: 2,
            }}
          >
            {!authState.user && !userState.user ? (
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleLogin}
                sx={{ fontSize: { xs: 14, sm: 16 }, borderRadius: 2 }}
              >
                Login to Proceed ₹{cartItems.total_cost}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ fontSize: { xs: 14, sm: 16 }, borderRadius: 2 }}
              >
                Proceed to Payment
              </Button>
            )}
          </Box>
        </>
      ) : (
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
          width: {
            xs: "100vw",
            sm: 400,
          },
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {cartList()}
    </SwipeableDrawer>
  );
}
