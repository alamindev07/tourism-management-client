import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import NoBookingsSection from "./NoBookingsSection";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Confetti from "react-confetti";

const borderColors = [
  "border-b-4 border-pink-400",
  "border-b-4 border-blue-400",
  "border-b-4 border-green-400",
  "border-b-4 border-yellow-400",
  "border-b-4 border-purple-400",
  "border-b-4 border-indigo-400",
];

export default function MyBookings() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [cancelingId, setCancelingId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [guideNames, setGuideNames] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/bookings/my/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const acceptedCount = bookings.filter(
      (b) => b.status === "accepted"
    ).length;
    if (acceptedCount > 0 && acceptedCount % 3 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [bookings]);

  useEffect(() => {
    const fetchGuideNames = async () => {
      const uniqueIds = [...new Set(bookings.map((b) => b.tourGuideId))];
      const nameMap = {};
      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const res = await axiosSecure.get(`/api/users/id/${id}`);
            nameMap[id] = res.data.name || "Unknown";
          } catch {
            nameMap[id] = "Unknown";
          }
        })
      );
      setGuideNames(nameMap);
    };
    if (bookings.length) fetchGuideNames();
  }, [bookings, axiosSecure]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });
    if (!result.isConfirmed) return;

    setCancelingId(id);
    try {
      await axiosSecure.delete(`/api/bookings/${id}`);
      await queryClient.invalidateQueries(["myBookings", user.email]);
      await refetch();
      Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not cancel booking.", "error");
    } finally {
      setCancelingId(null);
    }
  };

  const handlePayNow = (booking) => {
    navigate(`/dashboard/payment/${booking._id}`, { state: { booking } });
  };

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  if (isLoading)
    return <p className="text-center py-10">Loading bookings...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Error loading bookings.</p>
    );

  return (
    <div className="p-4 sm:p-6">
      {showConfetti && <Confetti />}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <NoBookingsSection />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-300">
          <div className="w-full overflow-auto sm:overflow-visible">
            <table className="min-w-[800px] w-full bg-white text-center text-sm md:text-base">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr className="h-16">
                  <th>#</th>
                  <th>Image</th>
                  <th>Package</th>
                  <th>Tour Guide</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, idx) => (
                  <tr
                    key={booking._id}
                    className={`transition-all hover:bg-blue-50 ${
                      borderColors[idx % borderColors.length]
                    }`}
                  >
                    <td className="py-3 font-semibold">
                      {indexOfFirst + idx + 1}
                    </td>
                    <td>
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={booking.packageImage}
                        alt={booking.packageTitle}
                        className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-gray-300 shadow"
                      />
                    </td>
                    <td className="font-medium text-blue-700">
                      {booking.packageTitle}
                    </td>
                    <td className="text-gray-600">
                      {guideNames[booking.tourGuideId] || "—"}
                    </td>
                    <td>
                      <p className="flex justify-center items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-blue-500" />
                        {new Date(booking.tourDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td>
                      <span className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                        <CiBadgeDollar /> {booking.price}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2 font-semibold">
                        <FaCheckCircle
                          className={
                            booking.status === "accepted"
                              ? "text-green-500"
                              : booking.status === "pending"
                              ? "text-yellow-500"
                              : booking.status === "in review"
                              ? "text-blue-500"
                              : "text-red-500"
                          }
                        />
                        <span
                          className={
                            booking.status === "accepted"
                              ? "text-green-600"
                              : booking.status === "pending"
                              ? "text-yellow-600"
                              : booking.status === "in review"
                              ? "text-blue-600"
                              : "text-red-600"
                          }
                        >
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="flex justify-center flex-wrap gap-2 py-3 px-2 max-w-[150px] mx-auto">
                      {(booking.status === "pending" ||
                        booking.status === "in_review") && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancelingId === booking._id}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded cursor-pointer transition disabled:opacity-50"
                        >
                          {cancelingId === booking._id
                            ? "Canceling..."
                            : "Cancel"}
                        </button>
                      )}
                      {booking.status === "pending" && (
                        <button
                          onClick={() => handlePayNow(booking)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded cursor-pointer transition"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="text-center my-10">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Alltrips")}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition"
            >
              Book More Tour Packages
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
