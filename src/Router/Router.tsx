import { createBrowserRouter, Navigate } from "react-router-dom";

// Route Guards
import PrivateRoute from "../components/PrivateRoutes/PrivateRoutes"; // ✅ file name corrected
import ProtectedWithCart from "../components/ProtectedWithCart/ProtectedWithCart";

// Pages
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProductsListPage from "../pages/ProductsListPage";
import BulkOrderPage from "../pages/BulkOrderPage";
import OrdersListPage from "../pages/OrdersListPage";
import ProductsDetailPage from "../pages/ProductsDetailPage";
import CheckoutPage from "../pages/CheckOutPage";

const router = createBrowserRouter([
  // --- Public routes ---
  {
    path: "/",
    element: <LoginPage />,
  },

  // --- Private routes (Require login) ---
  {
    element: (
      <PrivateRoute>
        <ProtectedWithCart />
      </PrivateRoute>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/products", element: <ProductsListPage /> },
      { path: "/orders", element: <OrdersListPage /> },
      { path: "/bulk-orders", element: <BulkOrderPage /> },
      {
        path: "/products/:id",
        element: <ProductsDetailPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },

  // --- 404 fallback ---
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
