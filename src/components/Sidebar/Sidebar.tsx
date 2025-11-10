// src/components/Layout/Sidebar.tsx
import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdMenu, MdPerson, MdKeyboardArrowRight } from "react-icons/md";

import { useAuth } from "../../context/AuthContext"; // adjust path if needed

import sidebarItems from "../../data/MenuOptions/Sidebar";
import footerOptions from "../../data/MenuOptions/SideB-Footer";
import type { FooterOption } from "../../types/type";

interface SidebarProps {
  collapsed: boolean;
  toggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // may be undefined if you didn't implement it; handle below

  const [footerOpen, setFooterOpen] = React.useState(false);
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => location.pathname.startsWith(path);

  // Click outside handler closes the footer popover
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (footerRef.current && !footerRef.current.contains(e.target as Node)) {
        setFooterOpen(false);
      }
    }
    if (footerOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [footerOpen]);

  const handleFooterOption = (opt: FooterOption) => {
    setFooterOpen(false);
    if (opt.action === "logout") {
      try {
        logout?.(); // call logout if available in context
      } catch {
        // ignore
      }
      // navigate to login page after logout
      navigate("/login");
      return;
    }
    if (opt.path) navigate(opt.path);
    // handle other custom actions if defined
  };

  return (
    <aside
      className={`h-screen border-r bg-white flex flex-col transition-all duration-300 shadow-lg
        ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-blue-600">FlowCart</div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="rounded px-1 py-0.5 text-blue-600 font-semibold">
              F
            </div>
          </div>
        )}

        <button
          onClick={toggle}
          className="text-gray-600 hover:text-gray-900 p-1 rounded"
          aria-label="Toggle sidebar"
        >
          <MdMenu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-2 flex-grow overflow-auto">
        <ul className="p-2 space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition
                  ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with small menu */}
      <div className="p-3 border-t relative" ref={footerRef}>
        <div className="flex items-center justify-between">
          {/* Profile summary */}
          <button
            onClick={() => setFooterOpen((s) => !s)}
            className="w-full flex items-center gap-3 text-left rounded px-1 py-1 hover:bg-gray-50 transition"
            aria-expanded={footerOpen}
            aria-controls="sidebar-footer-menu"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                {/* initials or icon */}
                <MdPerson size={18} />
              </div>

              {!collapsed && (
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    Demo Admin
                  </div>
                  <div className="text-xs text-gray-500">
                    admin@flowcart.dev
                  </div>
                </div>
              )}
            </div>

            {!collapsed && (
              <div className="text-gray-400">
                <MdKeyboardArrowRight
                  size={20}
                  className={`${footerOpen ? "rotate-90 transform" : ""}`}
                />
              </div>
            )}
          </button>
        </div>

        {/* Popover menu (above the footer button) */}
        {footerOpen && (
          <div
            id="sidebar-footer-menu"
            className={`absolute left-3 bottom-14 w-48 bg-white border rounded-md shadow-lg z-50 overflow-hidden`}
            role="menu"
          >
            <ul className="divide-y">
              {footerOptions.map((opt) => (
                <li key={opt.label}>
                  <button
                    onClick={() => handleFooterOption(opt)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    role="menuitem"
                  >
                    <span className="text-gray-500">{opt.icon}</span>
                    <span className="flex-1 text-left">{opt.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Small copyright line when expanded */}
        {!collapsed && (
          <div className="mt-2 text-xs text-gray-400">
            © {new Date().getFullYear()} FlowCart
          </div>
        )}
      </div>
    </aside>
  );
};
