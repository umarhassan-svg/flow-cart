import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navItems from "../../data/MenuOptions/Navbar";
import sidebarItems from "../../data/MenuOptions/Sidebar";
import footerOptions from "../../data/MenuOptions/SideB-Footer";
import { useAuth } from "../../context/AuthContext";

type Props = {
  onToggleCart?: () => void;
  cartCount?: number;
  onToggleSidebar?: () => void; // desktop collapse
};

const Navbar: React.FC<Props> = ({
  onToggleCart,
  cartCount = 0,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = React.useState(false); // desktop profile dropdown
  const [opensidebaroptions, setOpenSidebarOptions] = React.useState(false);
  const toggleSidebaroptions = () => setOpenSidebarOptions(!opensidebaroptions);
  const [openaccountoptions, setOpenaccountOptions] = React.useState(false);
  const toggleaccountoptions = () => setOpenaccountOptions(!openaccountoptions);

  const isActive = (p: string | undefined) => location.pathname === p;

  // close profile dropdown on outside click
  const profileRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [profileOpen]);

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      navigate("/login");
    }
  };

  const handleProfileAction = (opt: {
    label: string;
    path?: string;
    action?: string;
  }) => {
    setProfileOpen(false);
    if (opt.action === "logout") return void handleLogout();
    if (opt.path) navigate(opt.path);
  };

  return (
    <nav className="bg-white border-b shadow-sm relative">
      <div className="max-w-none px-4 h-14 flex items-center justify-between">
        {/* left: logo + mobile burger */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 tooltip"
            onClick={() => setOpen((s) => !s)}
            aria-label="Open menu"
          >
            {open ? "✕" : "☰"}
          </button>
          {/* desktop: sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="tooltip hidden md:inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
            title="Toggle sidebar tooltip"
          >
            ☰
          </button>

          <div
            className="text-lg font-semibold text-blue-600 cursor-pointer"
            onClick={() => navigate("/Home")}
          >
            FlowCart
          </div>
        </div>

        {/* center: desktop nav */}
        <ul className="hidden md:flex items-center space-x-4 ">
          {navItems.map((it) => (
            <li key={it.path}>
              <button
                onClick={() => navigate(it.path)}
                className={`tooltip px-2 py-1 rounded text-sm ${
                  isActive(it.path)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>

        {/* right: cart & profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleCart}
            className="tooltip relative p-2 rounded hover:bg-gray-100"
            aria-label="Open cart"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop profile button + dropdown */}
          {isAuthenticated && (
            <div
              className="hidden md:flex items-center relative"
              ref={profileRef}
            >
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="tooltip flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <span className="text-sm text-gray-700">Profile</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white border rounded-md shadow-lg z-30 overflow-hidden">
                  <ul className="divide-y">
                    {footerOptions.map((opt) => (
                      <li key={opt.label}>
                        <button
                          onClick={() => handleProfileAction(opt)}
                          className="tooltip w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE dropdown — contains nav + sidebar items + profile/footer */}
      {open && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 z-20 animate-slide-down">
          <ul>
            {/* primary nav */}
            {navItems.map((it) => (
              <li key={it.path} className="border-gray-500 border-t">
                <button
                  onClick={() => {
                    navigate(it.path);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm rounded 
                      ${
                        isActive(it.path)
                          ? "text-blue-600 font-medium bg-blue-50 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                >
                  {it.label}
                </button>
              </li>
            ))}

            <li className="border-gray-700 border-t">
              <button
                onClick={toggleSidebaroptions}
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                Menu{" "}
                <span className="float-right">
                  {opensidebaroptions && isAuthenticated ? "▲" : "▼"}
                </span>
              </button>
            </li>

            {opensidebaroptions && isAuthenticated && (
              <li className="border-t mt-1">
                {sidebarItems.map((it) => (
                  <button
                    key={it.path}
                    onClick={() => {
                      navigate(it.path);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm rounded 
                      ${
                        isActive(it.path)
                          ? "text-blue-600 font-medium bg-blue-50 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {it.label}
                  </button>
                ))}
              </li>
            )}

            <li className="border-gray-700 border-t">
              <button
                onClick={toggleaccountoptions}
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                Account{" "}
                <span className="float-right">
                  {openaccountoptions && isAuthenticated ? "▲" : "▼"}
                </span>
              </button>
            </li>

            {openaccountoptions && isAuthenticated && (
              <li className="border-t mt-1">
                {footerOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setOpen(false);
                      if (opt.action === "logout") handleLogout();
                      else if (opt.path) navigate(opt.path);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm rounded 
                      ${
                        isActive(opt.path)
                          ? "text-blue-600 font-medium bg-blue-50 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
