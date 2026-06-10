import { useNavigate } from "react-router-dom";
import { getEmployeeById } from "../services/employeeServices";

export const columns = [
  {
    name: "#",
    selector: (row) => row.sno,
    width: "60px",
    hide: "md",
  },

  {
    name: "Photo",
    cell: (row) => row.profileImage,
    width: "80px",
    hide: "md",
  },

  {
    name: "Employee",
    selector: (row) => row.name,
    grow: 2,
    sortable: true,
  },

  {
    name: "Department",
    selector: (row) => row.dep_name,
    hide: "sm",
  },

  {
    name: "Actions",
    cell: (row) => row.action,
    grow: 2,
  },
];

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  const btnStyle = "px-2 py-1 text-xs rounded-md text-white whitespace-nowrap";

  return (
    <div className="flex flex-wrap gap-1 justify-center">
  <button
    onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
    className="px-2 py-1 text-xs rounded bg-blue-500 text-white"
  >
    View
  </button>

  <button
    onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
    className="px-2 py-1 text-xs rounded bg-yellow-500 text-white"
  >
    Edit
  </button>

  <button
    onClick={() => navigate(`/admin-dashboard/salary/${id}`)}
    className="px-2 py-1 text-xs rounded bg-teal-500 text-white"
  >
    Salary
  </button>

  <button
    onClick={() =>
      navigate(`/admin-dashboard/leaves/history/${id}`)
    }
    className="px-2 py-1 text-xs rounded bg-red-500 text-white"
  >
    Leave
  </button>
</div>
  );
};
