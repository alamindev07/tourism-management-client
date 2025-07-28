import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AssignedTours = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: assignedTours = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assignedTours", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tourguide/assigned?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    console.log("Fetched assigned tours:", assignedTours);
  }, [assignedTours]);

  const handleAccept = async (tourId) => {
    try {
      await axiosSecure.patch(`/api/tourguide/update-status/${tourId}`, { status: "accepted" });
      await refetch();
      Swal.fire("Accepted", "Tour has been accepted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to accept the tour.", "error");
    }
  };

  const handleReject = (tourId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will reject the tour request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/api/tourguide/update-status/${tourId}`, { status: "rejected" });
          await refetch();
          Swal.fire("Rejected", "Tour has been rejected.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to reject the tour.", "error");
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in-review":
        return "text-yellow-600 font-semibold";
      case "pending":
        return "text-red-500 font-semibold";
      case "accepted":
        return "text-green-600 font-semibold";
      case "rejected":
        return "text-gray-500 font-semibold";
      default:
        return "text-blue-500 font-semibold";
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading tours.</p>;
  if (!assignedTours.length) return <p className="text-center">No assigned tours found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assigned Tours</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Package</th>
              <th>Tourist</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => (
              <tr key={tour._id}>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={tour.packageImage}
                      alt={tour.packageTitle}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span>{tour.packageTitle}</span>
                  </div>
                </td>
                <td className="py-2">{tour.touristName}</td>
                <td className="py-2">{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td className="py-2">${tour.price}</td>
                <td className={`py-2 ${getStatusColor(tour.status)}`}>{tour.status}</td>
                <td className="py-2 flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    disabled={tour.status !== "in-review"}
                    onClick={() => handleAccept(tour._id)}
                  >
                    <FaCheckCircle /> Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={tour.status !== "in-review"}
                    onClick={() => handleReject(tour._id)}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedTours;