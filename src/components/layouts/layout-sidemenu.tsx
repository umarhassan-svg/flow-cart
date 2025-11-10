import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggle={toggleSidebar} />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-25"} 
          p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
