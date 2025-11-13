// src/components/Sidebar/Sidebar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sidebarItems from "../../data/MenuOptions/Sidebar";

interface Props {
  collapsed: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside
      className={`h-full border-r bg-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* menu */}
      <nav className="mt-2 flex-grow overflow-auto">
        <ul className="p-2 space-y-1">
          {sidebarItems.map((it) => (
            <li key={it.path}>
              <button
                onClick={() => navigate(it.path)}
                className={`tooltip flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition ${
                  isActive(it.path)
                    ? "bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <span className="flex-shrink-0">{it.icon}</span>
                {!collapsed && <span>{it.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
