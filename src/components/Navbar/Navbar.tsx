import { useNavigate, useLocation } from "react-router-dom";
import navItems from "../../data/MenuOptions/Navbar";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = React.useState(false);
  const { isAuthenticated } = useAuth();

  // Function to check active path
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b shadow-sm relative">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          className="text-xl font-semibold text-blue-600 cursor-pointer hover:text-blue-700 transition"
          onClick={() => navigate("/")}
        >
          FlowCart
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            if (item.path === "/login" && isAuthenticated) return null;

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`font-medium transition px-2 py-1 rounded 
                ${
                  isActive(item.path)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {openMenu && (
        <div className="md:hidden bg-white border-t shadow-md absolute w-full left-0 z-20 animate-slide-down">
          <ul className="flex flex-col py-3">
            {navItems.map((item) => {
              if (item.path === "/login" && isAuthenticated) return null;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setOpenMenu(false);
                    }}
                    className={`block px-6 py-3 text-left font-medium transition 
                    ${
                      isActive(item.path)
                        ? "text-blue-600 bg-gray-100 border-l-4 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
