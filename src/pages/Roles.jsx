import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";

// Mock API call for role data
const fetchRoles = () => {
  return Promise.resolve([
    { id: 1, name: "Admin", permissions: "Read, Write, Delete", users: 10 },
    { id: 2, name: "Editor", permissions: "Read, Write", users: 5 },
    { id: 3, name: "Viewer", permissions: "Read", users: 15 },
  ]);
};

const Roles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRoles().then(setData);
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Role Name",
        cell: (info) => <strong>{info.getValue()}</strong>,
      }),
      columnHelper.accessor("permissions", {
        header: "Permissions",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("users", {
        header: "Assigned Users",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        header: "Actions",
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleEdit(info.row.original)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDelete(info.row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (role) => {
    alert(`Editing role: ${role.name}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting role with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Role
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left text-sm font-semibold border-b border-gray-300"
                    >
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 ${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm border-b border-gray-300"
                  >
                    {cell.column.columnDef.cell?.(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
