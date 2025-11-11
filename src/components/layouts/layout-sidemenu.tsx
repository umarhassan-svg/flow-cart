import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ✅ Top Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Sidebar stays full height minus navbar */}
        <Sidebar collapsed={collapsed} toggle={toggleSidebar} />

        {/* ✅ Main content takes the remaining space */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 justify-center">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
