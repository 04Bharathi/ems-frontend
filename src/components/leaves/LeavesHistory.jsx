import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getLeaveHistory } from "../../services/leaveServices";

const LeavesHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const { id } = useParams();
  const fetchLeaves = async (id) => {
    try {
      let sno = 1;
      const response = await getLeaveHistory(id);
      if (response.data.success) {
        const data = response.data.leaveList;
        const list = data.map((eachLeave) => ({
          sno: sno++,
          id: eachLeave._id,
          leaveType: eachLeave.leaveType,
          from: new Date(eachLeave.startDate).toLocaleDateString(),
          to: new Date(eachLeave.endDate).toLocaleDateString(),
          description: eachLeave.reason.trim(),
          status: eachLeave.status,
        }));
        console.log(list);
        setLeaveHistory(list);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    fetchLeaves(id);
    console.log(leaveHistory);
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Leave History</h2>
            <p className="text-teal-100 text-sm mt-1">
              View employee leave records and statuses
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {leaveHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-5xl mb-3">📋</div>
                <h3 className="text-lg font-semibold text-gray-700">
                  No Leave Records Found
                </h3>
                <p className="text-gray-500 mt-1">
                  This employee has not submitted any leave requests yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-3 text-left">Sno</th>
                      <th className="p-3 text-left">Leave Type</th>
                      <th className="p-3 text-left">From</th>
                      <th className="p-3 text-left">To</th>
                      <th className="p-3 text-left">Reason</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaveHistory.map((leave) => (
                      <tr
                        key={leave.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 font-medium">{leave.sno}</td>

                        <td className="p-3">{leave.leaveType}</td>

                        <td className="p-3">{leave.from}</td>

                        <td className="p-3">{leave.to}</td>

                        <td className="p-3 max-w-xs truncate">
                          {leave.description}
                        </td>

                        <td className="p-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              leave.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : leave.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          {leaveHistory.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t">
              <p className="text-sm text-gray-600">
                Total Records:{" "}
                <span className="font-semibold">{leaveHistory.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeavesHistory;
