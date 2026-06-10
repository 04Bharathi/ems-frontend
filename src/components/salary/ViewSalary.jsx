import { useEffect, useState } from "react";
import { getSalaryById } from "../../services/salaryServices";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const [salaryDetails, setSalaryDetails] = useState([]);
  const { id } = useParams();
  console.log(id);

  let sno = 1;

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await getSalaryById(id, localStorage.getItem("token"));

        console.log(response.data);

        if (response.data.success) {
          setSalaryDetails(response.data.salary);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchSalary();
    }
  }, [id]);
  return (
    <div className="p-3 sm:p-5 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Salary History
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                View and manage employee salary records
              </p>
            </div>

            <input
              type="text"
              placeholder="Search Employee ID..."
              className="
              w-full md:w-72
              px-4 py-3
              border border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
            "
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-5 py-4 text-left">#</th>
                  <th className="px-5 py-4 text-left">Employee ID</th>
                  <th className="px-5 py-4 text-left">Basic Salary</th>
                  <th className="px-5 py-4 text-left">Allowance</th>
                  <th className="px-5 py-4 text-left">Deduction</th>
                  <th className="px-5 py-4 text-left">Net Salary</th>
                  <th className="px-5 py-4 text-left">Pay Date</th>
                </tr>
              </thead>

              <tbody>
                {salaryDetails.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-500">
                      No Salary Records Found
                    </td>
                  </tr>
                ) : (
                  salaryDetails.map((salary, index) => (
                    <tr key={salary._id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4">{index + 1}</td>

                      <td className="px-5 py-4 font-medium">
                        {salary.employeeId.employeeId}
                      </td>

                      <td className="px-5 py-4">
                        ₹{salary.basicSalary.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-green-600 font-medium">
                        ₹{salary.allowances.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-red-600 font-medium">
                        ₹{salary.dedections.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 font-semibold text-teal-600">
                        ₹{salary.netSalary.toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {salaryDetails.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
              No Salary Records Found
            </div>
          ) : (
            salaryDetails.map((salary, index) => (
              <div
                key={salary._id}
                className="bg-white rounded-2xl shadow-sm border p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800">#{index + 1}</span>

                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {salary.employeeId.employeeId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Basic Salary</p>
                    <p className="font-semibold">
                      ₹{salary.basicSalary.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Allowance</p>
                    <p className="font-semibold text-green-600">
                      ₹{salary.allowances.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Deduction</p>
                    <p className="font-semibold text-red-600">
                      ₹{salary.dedections.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Net Salary</p>
                    <p className="font-semibold text-teal-600">
                      ₹{salary.netSalary.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <p className="text-gray-500 text-sm">Pay Date</p>

                  <p className="font-medium">
                    {new Date(salary.payDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSalary;
