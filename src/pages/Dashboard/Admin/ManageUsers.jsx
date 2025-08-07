import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../LoadingSpiner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // changeable (you can add dropdown later)

  // Fetch users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  // Confirm role update
  const handleRoleUpdate = (email, role) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to make this user a ${role}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${role}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/api/users/role/by-email/${email}`, { role });
          if (res.status === 200) {
            toast.success(`User role updated to ${role}`);
            refetch();
          } else {
            toast.error("Failed to update role");
          }
        } catch (error) {
          toast.error("An error occurred while updating role");
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8  bg-gray-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-400">
        Manage Users Role
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-200">
        <table className="table  table-zebra   w-full text-sm md:text-base ">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((u, index) => (
              <tr key={u._id} className=" transition-all duration-300">
                <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2 font-medium">{u.name}</td>
                <td className="px-4 py-2 text-sm">{u.email}</td>
                <td className="px-4 py-2">
                  <span className="badge badge-outline capitalize">{u.role}</span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    className="btn btn-sm btn-outline btn-info gap-2"
                    disabled={u.role === "admin"}
                    onClick={() => handleRoleUpdate(u.email, "admin")}
                  >
                    <FaUserShield className="text-blue-600" />
                    Admin
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-success gap-2"
                    disabled={u.role === "tourguide"}
                    onClick={() => handleRoleUpdate(u.email, "tourguide")}
                  >
                    <FaUser className="text-green-600" />
                    Tour Guide
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`btn btn-sm ${currentPage === page + 1 ? "btn-active" : "btn-outline"}`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn btn-outline "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
