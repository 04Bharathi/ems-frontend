import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import {
  addEmployee,
  getDepartmentList,
  getEmployeeById,
  updateEmployeeApi,
} from "../../services/employeeServices";

const EditEmployee = ({}) => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    role: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await getDepartmentList();
      setDepartment(departments || []);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await getEmployeeById(id, localStorage.getItem("token"));
      const employeeData = await response.data.employee;
      setEmployee((prevState) => ({
        ...prevState,
        name: employeeData.userId.name,
        department: employeeData.department._id,
        salary: employeeData.salary,
        maritalStatus: employeeData.maritalStatus,
        designation: employeeData.designation,
        role: employeeData.userId.role,
      }));
    };
    fetchEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await updateEmployeeApi(id, employee, token);
      console.log(response);
      navigate("/admin-dashboard/employee");
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  console.log(employee);
  console.log(department);

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 bg-gray-100 p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Employee</h2>

        {department.length === 0 ? (
          <p className="text-gray-500">There is no department</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {department.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="maritalStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Marital Status
              </label>
              <select
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                name="maritalStatus"
                value={employee.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                name="role"
                value={employee.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg font-medium transition-all duration-200"
              >
                Edit Employee
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditEmployee;
