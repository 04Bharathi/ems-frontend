import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  changeLeaveStatus,
  getLeavesByLeaveId,
} from "..//../services/leaveServices";

const LeaveDetails = () => {
  const [leaveDetails, setLeaveDetails] = useState({});

  const { id } = useParams();

  const fetchLeavesById = async (id) => {
    try {
      const response = await getLeavesByLeaveId(id);
      console.log(response);
      if (response.data.success) {
        const data = response.data.leaveDetails;
        const fetchedleaveDetails = {
          id: data._id,
          name: data.employeeId.userId.name,
          employeeId: data.employeeId.employeeId,
          leaveType: data.leaveType,
          reason: data.reason.trim(),
          department: data.employeeId.department.dep_name,
          startDate: new Date(data.startDate).toLocaleDateString(),
          endDate: new Date(data.endDate).toLocaleDateString(),
          status: data.status,
          profileImg: `http://localhost:5000/uploads/${data.employeeId.userId.profileImage}`,
        };
        console.log(fetchedleaveDetails);
        setLeaveDetails(fetchedleaveDetails);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeavesById(id);
    }
  }, [id]);

  const handleStatus = async (id, status) => {
    try {
      const response = await changeLeaveStatus(id, status);
      if (response.data.success) {
        setLeaveDetails((prevState) => ({
          ...prevState,
          status: response.data.updateStatus.status,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!leaveDetails.name) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-teal-600 text-white px-8 py-4">
          <h1 className="text-3xl font-bold">Leave Details</h1>
          <p className="text-teal-100">Employee Leave Information</p>
        </div>

        {/* Main Content */}
        <div className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="flex flex-col items-center text-center">
              <img
                src={leaveDetails.profileImg}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-teal-500 shadow-md"
              />

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {leaveDetails.name}
              </h2>

              <p className="text-gray-500 mt-1">
                Employee ID: {leaveDetails.employeeId}
              </p>

              <span className="mt-3 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                {leaveDetails.department}
              </span>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-2">
              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Leave Type</p>
                  <h3 className="text-lg font-semibold mt-1">
                    {leaveDetails.leaveType}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Department</p>
                  <h3 className="text-lg font-semibold mt-1">
                    {leaveDetails.department}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Start Date</p>
                  <h3 className="text-lg font-semibold mt-1">
                    {leaveDetails.startDate}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">End Date</p>
                  <h3 className="text-lg font-semibold mt-1">
                    {leaveDetails.endDate}
                  </h3>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Reason */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-lg mb-2">Leave Reason</h3>

                  <p className="text-gray-700">{leaveDetails.reason}</p>
                </div>

                {/* Status / Actions */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-lg mb-3">Status</h3>

                  {leaveDetails.status === "Pending" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleStatus(leaveDetails.id, "Approved")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(leaveDetails.id, "Rejected")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        leaveDetails.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {leaveDetails.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
