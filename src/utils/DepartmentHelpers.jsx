import { SortOrder } from "react-data-table-component";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    hide: "md",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({
  department,
  setEditDepartment,
  setShowModal,
  handleDelete,
}) => {
  const handleEdit = () => {
    setShowModal(true);
    setEditDepartment(department);
  };

  return (
    <div className="flex space-x-3">
      <button
        onClick={handleEdit}
        className="bg-yellow-500 rounded py-1 px-3 text-white font-medium text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(department._id)}
        className="bg-red-500 rounded py-1 px-3 text-white font-medium text-sm"
      >
        Delete
      </button>
    </div>
  );
};
