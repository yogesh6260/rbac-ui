import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";

// Mock API call for user data
const fetchUsers = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      role: "Viewer",
      status: "Active",
    },
  ]);
};

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers().then(setData);
  }, []);

  // Define table columns using TanStack's column helper
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded ${
              info.getValue() === "Active" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        header: "Actions",
        cell: (info) => (
          <div>
            <button
              className="text-blue-500 hover:underline mr-2"
              onClick={() => handleEdit(info.row.original)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline"
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

  // Table instance setup
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Action handlers
  const handleEdit = (user) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting user with ID: ${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add User
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 p-2 bg-gray-100"
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {cell.column.columnDef.cell?.(cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
