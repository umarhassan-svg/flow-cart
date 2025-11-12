// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import ProtectedWithCart from "./components/ProtectedWithCart/ProtectedWithCart";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ProductsListPage from "./pages/ProductsListPage";
import BulkOrderPage from "./pages/BulkOrderPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import OrdersListPage from "./pages/OrdersListPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected area that requires auth */}
        <Route element={<PrivateRoutes />}>
          {/* Only protected routes inside this element */}
          <Route path="/logout" element={<div>Logout - Protected Route</div>} />
          {/* Wrap those protected routes with CartProvider via ProtectedWithCart */}
          <Route element={<ProtectedWithCart />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductsListPage />} />
            <Route path="/bulk-orders" element={<BulkOrderPage />} />
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={<div>Checkout - Protected Route</div>}
            />
            <Route
              path="/profile"
              element={<div>Profile - Protected Route</div>}
            />
            <Route
              path="/settings"
              element={<div>Settings - Protected Route</div>}
            />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/403" element={<div>403 - Forbidden</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
