import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import AddEmployee from "./AddEmployee";
import { getEmployeeList } from "../../services/employeeServices";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelpers";
import ViewEmployee from "./ViewEmployee";
import { Outlet } from "react-router-dom";

const customStyles = {
  table: {
    style: {
      width: "100%",
    },
  },

  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: "600",
      whiteSpace: "nowrap",
    },
  },

  rows: {
    style: {
      minHeight: "65px",
    },
  },

  cells: {
    style: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

const EmployeeList = () => {
  const [modal, setModal] = useState(false);
  const [empModal, setEmpModal] = useState(false);
  const [employeesList, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchEmployee, setSearch] = useState("");
  const [filterEmployee, setFilterEmployee] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await getEmployeeList(localStorage.getItem("token"));

      if (response.data.success) {
        let sno = 1;

        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),

          profileImageUrl: `https://ems-api-red.vercel.app/uploads/${emp.userId.profileImage}`,

          profileImage: (
            <img
              src={`https://ems-api-red.vercel.app/uploads/${emp.userId.profileImage}`}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
          ),

          action: (
            <EmployeeButtons
              id={emp._id}
              closeEmpModal={() => setEmpModal(!empModal)}
              setSelectedEmployee={setSelectedEmployee}
            />
          ),
        }));

        setEmployeesList(data);
        setFilterEmployee(data);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredList = employeesList.filter((emp) =>
    emp.name.toLowerCase().includes(searchEmployee.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Employees
        </h1>

        <p className="text-gray-500 text-sm sm:text-base">
          Manage employee records
        </p>
      </div>

      {/* Search & Add */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            onChange={handleSearch}
            placeholder="Search employee..."
            className="
      w-full md:max-w-sm
      px-4 py-3
      border border-gray-300
      rounded-xl
      focus:ring-2 focus:ring-teal-500
      focus:outline-none
    "
          />

          <button
            onClick={() => setModal(true)}
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
            Add Employee
          </button>
        </div>
      </div>

      {modal && (
        <AddEmployee
          refreshEmployee={getEmployees}
          closeModal={() => setModal(!modal)}
        />
      )}

      {empModal && (
        <ViewEmployee
          closeEmpModal={() => setEmpModal(!empModal)}
          selectedEmployee={selectedEmployee}
        />
      )}

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredList}
          pagination
          responsive
          highlightOnHover
          customStyles={customStyles}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default EmployeeList;
