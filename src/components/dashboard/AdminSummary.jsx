import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSummary(response.data.data);
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mt-4">
            Dashboard Overview
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <SummaryCard
              icon={<FaUsers />}
              text="Total Employee"
              number={summary.totalEmployee}
              color="bg-teal-500"
            />

            <SummaryCard
              icon={<FaBuilding />}
              text="Total Department"
              number={summary.totalDepartment}
              color="bg-yellow-500"
            />

            <SummaryCard
              icon={<FaMoneyBillWave />}
              text="Monthly Pay"
              number={summary.totalSalary}
              color="bg-blue-500"
            />
          </div>

          <div className="mt-10 md:mt-12">
            <h3 className="text-center text-xl sm:text-2xl font-bold">
              Leave Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
              <SummaryCard
                icon={<FaFileAlt />}
                text="Leave Applied"
                number={summary.leaveSummary?.appliedFor || 0}
                color="bg-teal-500"
              />

              <SummaryCard
                icon={<FaCheckCircle />}
                text="Leave Approved"
                number={summary.leaveSummary?.approved || 0}
                color="bg-green-500"
              />

              <SummaryCard
                icon={<FaHourglassHalf />}
                text="Leave Pending"
                number={summary.leaveSummary?.pending || 0}
                color="bg-yellow-500"
              />

              <SummaryCard
                icon={<FaTimesCircle />}
                text="Leave Rejected"
                number={summary.leaveSummary?.rejected || 0}
                color="bg-red-500"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSummary;
