// components/StatusBadge.jsx
const StatusBadge = ({ status }) => {
  const statusMap = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  };

  const style = statusMap[status?.toLowerCase()] || statusMap.default;

  return (
    <span className={`px-2 py-1 rounded-3xl text-sm font-medium ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
