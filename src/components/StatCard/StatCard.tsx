import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  bgColor?: string; // e.g. "blue", "green", "orange", "indigo"
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  bgColor = "white",
}) => {
  // map allowed color names to Tailwind classes
  const bgClass =
    {
      blue: "bg-blue-50",
      green: "bg-green-50",
      orange: "bg-orange-50",
      indigo: "bg-indigo-50",
      gray: "bg-gray-50",
      white: "bg-white",
    }[bgColor] || "bg-white";

  return (
    <div
      className={`h-full rounded-xl ${bgClass} shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between mb-1 px-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-lg font-semibold text-gray-900">{value}</span>
      </div>
      {hint && (
        <div className="text-xs text-gray-500 font-light mt-1">{hint}</div>
      )}
    </div>
  );
};

export default StatCard;
