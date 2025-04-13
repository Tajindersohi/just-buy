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
import {addCartProductItem, getCartDetails, removeCartProduct} from '../../store/redux/cartThunk'
import { Chip, IconButton } from "@mui/material";
import { showError, showWarning } from "../../Assets/Constants/showNotifier";

export default function Cart({open, setOpen}) {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [refetchTrigger, setRefetchTrigger] = React.useState(false);

  useEffect(()=>{
    getCart();
  },[refetchTrigger])
  
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

  const getCart = async() => {
    dispatch(getCartDetails(cartItems.items))
  }
  
  const removeItem = async (id) => {
    await dispatch(removeCartProduct(id));
    setRefetchTrigger(prev => !prev); 
  };
  
  const addItem = async (id, count, max) => {
    if(count >= max){
      showWarning("Limit Reached", 'center', false);
      return;
    }
    await dispatch(addCartProductItem(id));
    setRefetchTrigger(prev => !prev);
  };

  const getCurrentPrice = (discount, total) => (total - (discount * total) / 100).toFixed(2);

  const cartList = () => (
    <Box sx={{ width: 400, p: 2, backgroundColor: "#fff", height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">My Cart</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CancelRoundedIcon />
        </IconButton>
      </Box>

      {cartItems.items.length > 0 ?
      <>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Typography fontWeight="medium">🕒 Delivery in 8 minutes</Typography>
          <Typography fontSize={12}>Shipment of {cartItems.items.length} items</Typography>
        </Box>

        <List sx={{ mt: 2, maxHeight: 300, overflowY: "auto" }}>
          {cartItems.items.map((item) => {
            const cartItem = cartItems.items.find((i) => i._id === item._id);
            if (!cartItem) return null;
            return (
              <ListItem key={item._id} sx={{ borderBottom: "1px solid #eee", alignItems: "flex-start" }}>
                <Box>
                  <img
                    src={item.imageUrl}
                    alt={cartItem.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: 8 }}
                  />
                </Box>
                <Box ml={2} flexGrow={1}>
                  <Typography fontWeight="medium">{cartItem.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.weight}
                  </Typography>
                  <Typography fontWeight="bold">
                    ₹{(cartItem.count * getCurrentPrice(item.discount, item.price)).toFixed(2)}
                  </Typography>
                </Box>
                <Chip
                  sx={{ borderRadius: "5px", height: 30 }}
                  color="success"
                  label={
                    <Box display="flex" gap={1} alignItems="center">
                      {cartItems.isLoading ? (
                        "Loading..."
                      ) : (
                        <>
                          <Box onClick={() => removeItem(item._id)} sx={{ cursor: "pointer", px: 1 }}>
                            -
                          </Box>
                          {cartItem.count}
                          <Box onClick={() => addItem(item._id, cartItem.count, item.maxCount)} sx={{ cursor: "pointer", px: 1 }}>
                            +
                          </Box>
                        </>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>


        {/* Bill Details */}
        <Box mt={2} p={2} sx={{ backgroundColor: "#f9f9f9", borderRadius: 2 }}>
          <Typography fontWeight="medium" ><b>Bill details </b></Typography>
          <Box display="flex" justifyContent="space-between"><span>Items total</span><span>₹{cartItems.total_cost}</span></Box>
          <Box display="flex" justifyContent="space-between"><span>Delivery charge</span><span style={{ textDecoration: 'line-through' }}>₹{cartItems.delivery_charges}</span><span style={{ color: 'green', marginLeft: 4 }}>FREE</span></Box>
          <Box display="flex" justifyContent="space-between"><span>Handling charge</span><span>₹{cartItems.handeling_charges}</span></Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between" fontWeight="bold"><span>Grand total</span><span>₹{cartItems.total_cost}</span></Box>
        </Box>

        {/* Footer: Checkout Button */}
        <Box sx={{ position: "sticky", bottom: 0, mt: 2, backgroundColor: "#fff", p: 2 }}>
          <Button variant="contained" color="success" fullWidth>Login to Proceed ₹{cartItems.total_cost}</Button>
        </Box>
      </>
      :
      <Box display={'flex'} justifyContent={'center'} height={'100%'} mt={5}>
        Your Cart is empty
      </Box>
    }
    </Box>
  );
  // const cartList = () => (
  //   <Box
  //     sx={{
  //       width: 400,
  //       padding: appTheme.spacing.md,
  //       backgroundColor: appTheme.colors.contentBackground,
  //     }}
  //     role="presentation"
  //   >
  //     <Box display="flex" justifyContent="space-between" alignItems="center">
  //       <Typography variant="h6" color={appTheme.heading.primary} ><b>My Cart</b></Typography>
  //       <IconButton onClick={toggleDrawer(false)} >
  //         <CancelRoundedIcon sx={{fontSize:30 , color:appTheme.colors.textSecondary}} />
  //       </IconButton>
  //     </Box>
  //     {/* <Divider /> */}
  //     <Box my={6}>
  //       {cartItems.length > 0 ? (
  //           <List>
  //           {cartItems.map((item) => (
  //             <ListItem
  //             key={item.id}
  //             secondaryAction={
  //                 <Chip
  //                   sx={{ borderRadius: "5px", fontSize: "12px", px: 1 }}
  //                   color="success"
  //                   label={
  //                     <Box display="flex" gap={1} alignItems="center">
  //                       <Box onClick={() => console.log("test")} sx={{ cursor: "pointer", px: 1 }}>
  //                         -
  //                       </Box>
  //                       {item.count}
  //                       <Box onClick={() => console.log("test")} sx={{ cursor: "pointer", px: 1 }}>
  //                         +
  //                       </Box>
  //                     </Box>
  //                   }
  //                 />
  //               }
  //               >
  //               <Typography
  //                   sx={{
  //                   fontSize: appTheme.typography.fontSize.lg,
  //                   fontWeight: appTheme.typography.fontWeight.semiBold,
  //                   color: appTheme.colors.info,
  //                   }}
  //               >
  //                   {item.name} -{" "}
  //                   <span >
  //                   ${item.count * getCurrentPrice(item.discount, item.price)}
  //                   </span>
  //               </Typography>
  //               </ListItem>
  //           ))}
  //           </List>
  //       ) : (
  //           <Typography
  //           sx={{
  //               textAlign: "center",
  //               mt: appTheme.spacing.md,
  //               color: appTheme.colors.textSecondary,
  //           }}
  //           >
  //           Your cart is empty.
  //           </Typography>
  //       )}
  //     </Box>

  //     {/* <Divider sx={{ my: appTheme.spacing.md }} /> */}

  //     {cartItems.length > 0 && (
  //       <ThemeButton label="Checkout" variant="primary" onClick = {()=>alert("Proceeding to checkout")} fullWidth={true}/>
  //     )}
  //   </Box>
  // );

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
