import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
