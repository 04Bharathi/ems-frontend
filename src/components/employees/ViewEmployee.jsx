import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getEmployeeById } from "../../services/employeeServices";
import { useParams } from "react-router-dom";

const ViewEmployee = ({}) => {
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const handleView = async (id) => {
      try {
        const response = await getEmployeeById(
          id,
          localStorage.getItem("token"),
        );
        if (response.data.success) {
          const emp = response.data.employee;
          const data = {
            _id: emp._id,
            name: emp.userId.name,
            employeeId: emp.employeeId,
            dob: new Date(emp.dob).toLocaleDateString(),
            gender: emp.gender,
            department: emp.department.dep_name,
            maritalStatus: emp.maritalStatus,
            profileImage: `https://ems-api-alpha.vercel.app/${emp.userId.profileImage}`,
          };
          setSelectedEmployee(data);
          console.log(data);
        }
        closeEmpModal();
      } catch (e) {}
    };
    handleView(id);
  }, []);

  return !selectedEmployee ? (
    <p>Loading..</p>
  ) : (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-8 py-6">
          <h1 className="text-3xl font-bold">Employee Details</h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center md:w-1/3">
              <img
                src={selectedEmployee.profileImage}
                alt={selectedEmployee.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {selectedEmployee.name}
              </h2>

              <p className="text-gray-500">{selectedEmployee.employeeId}</p>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-semibold text-lg">
                    {selectedEmployee.employeeId}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-semibold text-lg">
                    {selectedEmployee.dob}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold text-lg">
                    {selectedEmployee.gender}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold text-lg">
                    {selectedEmployee.department}
                  </p>
                </div>

                <div className="border rounded-lg p-4 md:col-span-2">
                  <p className="text-sm text-gray-500">Marital Status</p>
                  <p className="font-semibold text-lg">
                    {selectedEmployee.maritalStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
