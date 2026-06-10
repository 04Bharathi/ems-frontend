import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import {
  getDepartmentList,
  getEmployeeByDep,
} from "../../services/employeeServices";
import { addSalary } from "../../services/salaryServices";

const Add = ({}) => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    dedections: 0,
    payDate: null,
  });

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await getDepartmentList();
      setDepartment(departments || []);
    };
    getDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await addSalary(employee, token);
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

  const handleDepartment = async (e) => {
    const response = await getEmployeeByDep(
      e.target.value,
      localStorage.getItem("token"),
    );
    console.log(response);
    setEmployees(response.data.employees);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Salary</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5"
        >
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
              value={department._id}
              onChange={handleDepartment}
              required
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
              htmlFor="employee"
              className="block text-sm font-medium text-gray-700"
            >
              Employee
            </label>
            <select
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              name="employeeId"
              value={employee.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="basicSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Basic Salary
            </label>
            <input
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="number"
              placeholder="Basic Salary"
              name="basicSalary"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="allowances"
              className="block text-sm font-medium text-gray-700"
            >
              Allowances
            </label>
            <input
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="number"
              name="allowances"
              placeholder="Allowances"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="dedections"
              className="block text-sm font-medium text-gray-700"
            >
              Dedections
            </label>
            <input
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="number"
              name="dedections"
              placeholder="Dedections"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="payDate"
              className="block text-sm font-medium text-gray-700"
            >
              Pay Date
            </label>
            <input
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="date"
              name="payDate"
              placeholder="Pay Date"
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg font-medium transition-all duration-200"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
