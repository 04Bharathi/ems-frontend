import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getLeavesById } from "../../services/leaveServices";

const LeaveList = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUserLeaves = async (id) => {
    const response = await getLeavesById(id);
    setLeaveHistory(response.data.fetchleaves);
    console.log(response.data.fetchleaves);
  };

  useEffect(() => {
    fetchUserLeaves(user._id);
  }, []);

  return (
    <div className="p-3 sm:p-5 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Leave History
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                View all your leave requests and statuses
              </p>
            </div>

            <button
              onClick={() => navigate("/employee-dashboard/leaves/request")}
              className="
              w-full md:w-auto
              bg-teal-600
              hover:bg-teal-700
              text-white
              px-5 py-3
              rounded-xl
              font-medium
              transition
            "
            >
              Request Leave
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <p className="text-gray-500 text-sm">Total Requests</p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {leaveHistory.length}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-sm border p-5">
            <p className="text-gray-500 text-sm">Approved</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {leaveHistory.filter((item) => item.status === "Approved").length}
            </h2>
          </div>

          <div className="bg-yellow-50 rounded-2xl shadow-sm border p-5">
            <p className="text-gray-500 text-sm">Pending</p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {leaveHistory.filter((item) => item.status === "Pending").length}
            </h2>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Leave Type</th>

                <th className="px-5 py-4 text-left">Start Date</th>

                <th className="px-5 py-4 text-left">End Date</th>

                <th className="px-5 py-4 text-left">Days</th>

                <th className="px-5 py-4 text-left">Status</th>

                <th className="px-5 py-4 text-left">Applied On</th>
              </tr>
            </thead>

            <tbody>
              {leaveHistory.length > 0 ? (
                leaveHistory.map((leave) => {
                  const totalDays =
                    Math.ceil(
                      (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24),
                    ) + 1;

                  return (
                    <tr key={leave._id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">
                        {leave.leaveType}
                      </td>

                      <td className="px-5 py-4">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">{totalDays} Days</td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {new Date(leave.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No Leave Requests Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {leaveHistory.length > 0 ? (
            leaveHistory.map((leave) => {
              const totalDays =
                Math.ceil(
                  (new Date(leave.endDate) - new Date(leave.startDate)) /
                    (1000 * 60 * 60 * 24),
                ) + 1;

              return (
                <div
                  key={leave._id}
                  className="bg-white rounded-2xl shadow-sm border p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">
                      {leave.leaveType}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                    >
                      {leave.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date</p>

                      <p className="font-medium">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">End Date</p>

                      <p className="font-medium">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Total Days</p>

                      <p className="font-medium">{totalDays} Days</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Applied On</p>

                      <p className="font-medium">
                        {new Date(leave.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
              No Leave Requests Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
