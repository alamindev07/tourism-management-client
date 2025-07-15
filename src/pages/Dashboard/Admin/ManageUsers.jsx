






import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../../components/ui/Table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FaUserShield, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch users with TanStack Query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  // Role Update Handler
  const handleRoleUpdate = async (userId, role) => {
    try {
      const res = await axiosSecure.patch(`/api/users/role/${userId}`, { role });
      if (res.status === 200) {
        toast.success(`Role updated to ${role}`);
        refetch();  // Refresh data immediately
      } else {
        toast.error("Failed to update role");
      }
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  // Define Columns
  const columnHelper = createColumnHelper();

  const columns = [
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
      cell: ({ row }) => {
        const currentRole = row.original.role;
        return (
          <span className="capitalize badge badge-info badge-sm">
            {currentRole}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <button
              disabled={user.role === "admin"}
              className="btn btn-xs btn-outline"
              onClick={() => handleRoleUpdate(user._id, "admin")}
            >
              <FaUserShield className="text-blue-500" /> Admin
            </button>
            <button
              disabled={user.role === "tourguide"}
              className="btn btn-xs btn-outline"
              onClick={() => handleRoleUpdate(user._id, "tourguide")}
            >
              <FaUser className="text-green-500" /> Tour Guide
            </button>
          </div>
        );
      },
    }),
  ];

  // Setup React Table instance
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Users Role</h2>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
