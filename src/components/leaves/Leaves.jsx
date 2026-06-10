import React, { useEffect, useState } from "react";
import { getLeaves } from "../../services/leaveServices";
import { columns, LeaveButtons } from "../../utils/LeaveHelpers";
import DataTable from "react-data-table-component";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0f766e",
        color: "#fff",
        minHeight: "56px",
        fontWeight: "600",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
      },
    },
  };

  const fetchLeaves = async () => {
    try {
      const response = await getLeaves();
      if (response.data.success) {
        let sno = 1;

        const formattedLeaves = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          name: leave.employeeId.userId.name,
          employeeId: leave.employeeId.employeeId,
          leaveType: leave.leaveType,
          reason: leave.reason.trim(),
          department: leave.employeeId.department.dep_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24),
            ) + 1,
          status: leave.status,
        }));

        setLeaves(formattedLeaves);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 🔥 Combine BOTH filters here
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.employeeId
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-3 sm:p-5 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Manage Leaves
          </h1>

          <p className="text-gray-500 mt-1">
            Review and manage employee leave requests
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <input
              placeholder="Search by Employee ID..."
              className="
              w-full lg:w-80
              px-4 py-3
              border border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
            "
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter("All")}
                className={`px-4 py-2 rounded-lg text-white font-medium transition
              ${
                statusFilter === "All"
                  ? "bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              >
                All
              </button>

              <button
                onClick={() => setStatusFilter("Approved")}
                className={`px-4 py-2 rounded-lg text-white font-medium transition
              ${
                statusFilter === "Approved"
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              >
                Approved
              </button>

              <button
                onClick={() => setStatusFilter("Pending")}
                className={`px-4 py-2 rounded-lg text-white font-medium transition
              ${
                statusFilter === "Pending"
                  ? "bg-yellow-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              >
                Pending
              </button>

              <button
                onClick={() => setStatusFilter("Rejected")}
                className={`px-4 py-2 rounded-lg text-white font-medium transition
              ${
                statusFilter === "Rejected"
                  ? "bg-red-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Leaves;
