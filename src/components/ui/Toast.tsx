import React, { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: "bg-green-600 border-green-700",
    error: "bg-red-600 border-red-700",
    info: "bg-blue-600 border-blue-700",
  };

  const icons = {
    success: <FiCheckCircle className="text-xl" />,
    error: <FiAlertCircle className="text-xl" />,
    info: <FiInfo className="text-xl" />,
  };

  return (
    <div
      className={`
        fixed top-6 right-6 
        flex items-center gap-3
        text-white px-4 py-3 
        rounded-xl border 
        shadow-lg backdrop-blur-md
        animate-slide-in
        ${styles[type]}
      `}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
