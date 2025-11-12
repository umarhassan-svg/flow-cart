const StatCard: React.FC<{
  label: string;
  value: string;
  hint?: string;
  bgColor?: string;
}> = ({ label, value, hint, bgColor }) => {
  return (
    <>
      <div
        className={`border-t rounded-md shadow-sm bg-${bgColor} w-50 h-24 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-gray-800">{label}</div>
          <div className="text-sm font-medium text-gray-800">{value}</div>
        </div>
        {hint && <div className="px-4 py-1 text-xs text-gray-500">{hint}</div>}
      </div>
    </>
  );
};

export default StatCard;
