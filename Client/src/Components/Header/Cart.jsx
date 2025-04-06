import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThemeButton from "../Common/ThemeButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import appTheme from "../../Assets/Theme";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getCartDetails} from '../../store/redux/cartThunk'
import { IconButton } from "@mui/material";

export default function Cart({open, setOpen}) {
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.list);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCartDetails(user.cart))
  },[user.cart])
  
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const removeItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const cartList = () => (
    <Box
      sx={{
        width: 400,
        padding: appTheme.spacing.md,
        backgroundColor: appTheme.colors.contentBackground,
      }}
      role="presentation"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color={appTheme.heading.primary} ><b>My Cart</b></Typography>
        <IconButton onClick={toggleDrawer(false)} >
          <CancelRoundedIcon sx={{fontSize:30 , color:appTheme.colors.textSecondary}} />
        </IconButton>
      </Box>
      {/* <Divider /> */}
      <Box my={6}>
        {cartItems.length > 0 ? (
            <List>
            {cartItems.map((item) => (
                <ListItem
                key={item.id}
                secondaryAction={
                    <Button
                    size="small"
                    sx={{ color: appTheme.colors.danger }}
                    onClick={() => removeItem(item.id)}
                    >
                    <DeleteOutlineIcon />
                    </Button>
                }
                >
                <Typography
                    sx={{
                    fontSize: appTheme.typography.fontSize.lg,
                    fontWeight: appTheme.typography.fontWeight.semiBold,
                    color: appTheme.colors.textPrimary,
                    }}
                >
                    {item.name} -{" "}
                    <span style={{ color: appTheme.colors.success }}>
                    {item.price}
                    </span>
                </Typography>
                </ListItem>
            ))}
            </List>
        ) : (
            <Typography
            sx={{
                textAlign: "center",
                mt: appTheme.spacing.md,
                color: appTheme.colors.textSecondary,
            }}
            >
            Your cart is empty.
            </Typography>
        )}
      </Box>

      {/* <Divider sx={{ my: appTheme.spacing.md }} /> */}

      {cartItems.length > 0 && (
        <ThemeButton label="Checkout" variant="primary" onClick = {()=>alert("Proceeding to checkout")} fullWidth={true}/>
      )}
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {cartList()}
      </SwipeableDrawer>
    </div>
  );
}
