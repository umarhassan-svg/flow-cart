import {
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import type { FooterOption } from "../../types/type";



const footerOptions: FooterOption[] = [
  { label: "Profile", icon: <MdPerson size={18} />, path: "/profile" },
  { label: "Settings", icon: <MdSettings size={18} />, path: "/settings" },
  { label: "Logout", icon: <MdLogout size={18} />, action: "logout" },
];

export default footerOptions;