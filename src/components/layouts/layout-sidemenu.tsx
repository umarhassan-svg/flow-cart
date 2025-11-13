// src/components/layouts/layout-sidemenu.tsx
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import CartComponent from "../Cart/Cart";

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleSidebar = () => setCollapsed((s) => !s);
  const toggleCart = () => setIsCartOpen((s) => !s);

  const { count } = useCart();

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      <Navbar
        onToggleCart={toggleCart}
        cartCount={count}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar visible only on md+ */}
        <div
          className={`hidden md:flex ${
            collapsed ? "w-16" : "w-60"
          } transition-all `}
        >
          <Sidebar
            collapsed={collapsed}
            toggle={() => setCollapsed((s) => !s)}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 flex justify-center">
          <div className="w-full max-w-4xl">{children}</div>
        </main>
      </div>

      {/* Cart overlay */}
      {isCartOpen && (
        <div
          onClick={toggleCart}
          className="tooltip fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Cart drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300
          w-full sm:w-[80%] md:w-[400px] lg:w-[420px] ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-lg font-semibold">Cart</h3>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-black text-xl tooltip"
          >
            ×
          </button>
        </div>
        <div className="h-[calc(100%-56px)] overflow-y-auto">
          <CartComponent />
        </div>
      </div>
    </div>
  );
};

export default Layout;
