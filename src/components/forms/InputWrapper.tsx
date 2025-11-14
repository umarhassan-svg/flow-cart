import type React from "react";

export const InputWrapper: React.FC<{
  label?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <div className={className}>
    {label && (
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
    )}
    {children}
  </div>
);
