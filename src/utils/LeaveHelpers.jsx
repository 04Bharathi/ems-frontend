import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export const columns = [
  {
    name: "#",
    selector: (row) => row.sno,
    width: "60px",
    center: true,
    hide: "md",
  },

  {
    name: "Employee",
    selector: (row) => row.name,
    sortable: true,
    grow: 2,
  },

  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    grow: 1,
  },

  {
    name: "Leave",
    selector: (row) => row.leaveType,
    grow: 1,
    hide: "sm",
  },

  {
    name: "Department",
    selector: (row) => row.department,
    grow: 1,
    hide: "md",
  },

  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
    center: true,
  },

  {
    name: "Status",
    center: true,
    width: "130px",
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
        ${
          row.status === "Approved"
            ? "bg-green-100 text-green-700"
            : row.status === "Rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    name: "Action",
    center: true,
    width: "100px",
    cell: (row) => <LeaveButtons id={row._id} />,
  },
];

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/admin-dashboard/leaves/id/${id}`)}
      className="
        flex items-center gap-1
        bg-teal-600 hover:bg-teal-700
        text-white
        px-3 py-2
        rounded-lg
        text-xs font-medium
        transition-all duration-200
        shadow-sm hover:shadow
      "
    >
      <FaEye size={12} />
      View
    </button>
  );
};