// src/components/ProtectedWithCart.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";

const ProtectedWithCart: React.FC = () => {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
};

export default ProtectedWithCart;
