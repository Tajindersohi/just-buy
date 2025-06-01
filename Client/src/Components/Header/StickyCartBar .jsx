import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const StickyCartBar = ({ onOpenCart, setModalType, open }) => {
  const cartItems = useSelector((state) => state.cart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalItems = cartItems.items.reduce((sum, item) => sum + item.count, 0);

  if (!isMobile || cartItems.items.length === 0 || open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "5%",
        left: "25%",
        zIndex: 1300,
        backgroundColor: "green",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1.5,
        height:"20px",
        width:"50%",
        borderRadius: "10px",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Box display="flex" alignItems="center">
        <ShoppingCartIcon sx={{ mr: 1 }} />
        <Box>
          <Typography variant="body2">{totalItems} items</Typography>
        </Box>
      </Box>
      <Button className="button" onClick={onOpenCart} sx={{ color: "#fff" }} endIcon={<>&#8250;</>}>
        View Cart
      </Button>
    </Box>
  );
};

export default StickyCartBar;
