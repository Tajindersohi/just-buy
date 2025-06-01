import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { syncCart } from '../../store/redux/cartThunk';

export const CartSync = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData && cartItems.length === 0) {
      dispatch(syncCart(JSON.parse(cartData)));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return null;
};
