import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import { FaCheckCircle, FaTimesCircle, FaLink } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch guide applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["guideApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/guide-applications");
      return res.data;
    },
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (app) => {
      const res = await axiosSecure.patch(
        `/api/users/role/by-email/${app.email}`,
        { role: "tourguide" }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.applicationDeleted) {
        Swal.fire("Approved!", "User promoted and application removed!", "success");
      } else {
        Swal.fire("Approved!", "User promoted to Tour Guide!", "success");
      }
      queryClient.invalidateQueries(["guideApplications"]);
    },
    onError: () => {
      toast.error("Failed to promote user. Please try again.");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/guide-applications/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Application rejected.", "success");
      queryClient.invalidateQueries(["guideApplications"]);
    },
    onError: () => {
      toast.error("Failed to reject application. Please try again.");
    },
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will reject the application and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentApplications = applications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-white via-sky-50 to-cyan-100 min-h-screen">
      <div className="text-center mb-10">
        <TypeAnimation
          sequence={[
            "Manage Tour Guide Applications 👥",
            2000,
            "Review, Accept or Reject 🚦",
            2000,
            "Find the Best Candidates ⭐",
            2000,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-cyan-700"
        />
        <p className="text-gray-600 mt-2">
          Handle tour guide requests responsibly and efficiently.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-xl text-gray-600">Loading Applications...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-xl border border-gray-200">
              <thead className="bg-cyan-600 text-white text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">CV</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  currentApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-t text-sm md:text-base hover:bg-cyan-50 transition duration-150"
                    >
                      <td className="px-4 py-3 text-sky-500 font-bold">{app.name || "Unknown"}</td>
                      <td className="px-4 py-3 text-accent">{app.email}</td>
                      <td className="px-4 py-3 text-fuchsia-500">{app.title}</td>
                      <td className="px-4 py-3 max-w-md line-clamp-3 text-orange-400">{app.reason}</td>
                      <td className="px-4 py-3">
                        <a
                          href={app.cvLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <FaLink /> View CV
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center capitalize text-emerald-600 font-semibold">
                        tourist
                      </td>
                      <td className="px-4 py-3 flex gap-3 justify-center">
                        <button
                          onClick={() => acceptMutation.mutate(app)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          disabled={acceptMutation.isLoading}
                        >
                          <FaCheckCircle /> Accept
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          disabled={rejectMutation.isLoading}
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="self-center text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCandidates;
