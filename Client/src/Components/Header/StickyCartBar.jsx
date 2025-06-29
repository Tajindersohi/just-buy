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

  if (!isMobile || totalItems === 0 || open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1300,
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        maxWidth: "400px",
        px: 2,
        py: 1.2,
        borderRadius: "999px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box display="flex" alignItems="center">
        <ShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="body2" fontWeight={500}>
          {totalItems} item{totalItems > 1 ? "s" : ""} in cart
        </Typography>
      </Box>

      <Button
        onClick={onOpenCart}
        size="small"
        sx={{
          color: "#fff",
          fontWeight: 600,
          textTransform: "none",
          px: 1.5,
          fontSize: "13px",
          minWidth: 0,
        }}
      >
        View
      </Button>
    </Box>
  );
};

export default StickyCartBar;
