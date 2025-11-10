
import {
  MdCategory,
  MdDashboard,
  MdListAlt,
} from "react-icons/md";

const sidebarItems = [
  { label: "Products", path: "/products", icon: <MdCategory size={20} /> },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={20} />,
  },
  { label: "Orders", path: "/orders", icon: <MdListAlt size={20} /> },
];

export default sidebarItems;