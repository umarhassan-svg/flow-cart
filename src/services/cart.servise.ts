import api from "./api/axios";
import type { CartItem } from "../context/CartContext";

export const CartService = {
  // optional: send current cart to server (create or update cart)
  saveCart: async (items: CartItem[]) => {
    // example endpoint — adjust to your backend
    const res = await api.post("/cart/sync", { items });
    return res.data;
  },

  // optional: checkout/cart create order
  checkout: async (items: CartItem[]) => {
    const res = await api.post("/cart/checkout", { items });
    return res.data;
  },
};

export default CartService;