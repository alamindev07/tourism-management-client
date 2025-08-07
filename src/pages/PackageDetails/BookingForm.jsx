
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const BookingForm = ({ pkg }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: userRole,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/role/${user.email}`);
      return res.data?.role;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/bookings/my/${user.email}`);
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: guides = [],
    isLoading: guidesLoading,
  } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users/role/tourguide");
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (authLoading || roleLoading || bookingsLoading || guidesLoading)
    return <div className="text-center py-20">Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return navigate("/login");

    if (userRole !== "tourist") {
      toast.error("Only tourists can book packages!");
      return;
    }

    if (!selectedDate || !selectedGuide) {
      toast.error("Please select a date and a tour guide.");
      return;
    }



    const alreadyBooked = bookings.some(
  (b) => b.packageId === pkg._id && b.status !== "cancelled"
);




if (alreadyBooked) {
  Swal.fire({
    title: "Already Booked!",
    text: "You have already booked this tour package.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Book Another Trips",
    cancelButtonText: "Close",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/Alltrips");
    }
  });
  return;
}

 


    try {
      const bookingData = {
        packageId: pkg?._id,
        packageTitle: pkg?.title,
        packageImage: pkg?.images[0],
        price: pkg?.price,
        tourDate: selectedDate.toISOString(),
        tourGuideId: selectedGuide,
        touristName: user.displayName,
        touristEmail: user.email,
        touristImage: user.photoURL,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/api/bookings", bookingData);

      const updated = await refetchBookings();
      const newCount = (updated?.data?.length || 0);

      if (newCount % 3 === 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 7000);
      }

      setModalOpen(true);
    } catch (error) {
      toast.error("Booking failed!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {showConfetti && (
        <>
          <Confetti style={{ zIndex: 9999, position: "fixed" }} />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-xl shadow-xl z-[10000] text-center"
          >
            <h2 className="text-2xl font-bold mb-2">🎉 Congratulations! 🎉</h2>
            <p className="text-lg font-medium">
              You have booked <span className="text-red-600 text-2xl font-bold">{bookings.length}</span> trips with us. Thank you for being a loyal traveler!
            </p>
          </motion.div>
        </>
      )}

      <section className="w-full max-w-3xl mx-auto   rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700 relative  bg-gradient-to-r from-pink-100 via-blue-100 to-purple-200 dark:text-stone-600">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <h2 className="text-4xl font-extrabold text-center">Book Your Adventure</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="label-text">Package Name</label>
            <input type="text" value={pkg?.title || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>
          <div>
            <label className="label-text">Your Name</label>
            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>
          <div>
            <label className="label-text">Email</label>
            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>
          <div className="md:col-span-2">
            <label className="label-text">Profile Image URL</label>
            <input type="text" value={user?.photoURL || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>
          <div>
            <label className="label-text">Price</label>
            <input type="text" value={`$${pkg?.price || ""} `} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>
          <div>
            <label className="label-text">Select Date</label>
            <DatePicker  selected={selectedDate} onChange={setSelectedDate} minDate={new Date()} placeholderText="Choose a date" className="input input-bordered w-full  dark:text-white" required />
          </div>
          <div className="md:col-span-2">
            <label className="label-text">Choose Tour Guide</label>
            <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} required className="select select-bordered w-full dark:text-white ">
              <option value="" disabled>
                -- Select a guide --
              </option>
              {guides.length > 0 ? (
                guides.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name || g.displayName}
                  </option>
                ))
              ) : (
                <option disabled>No guides found</option>
              )}
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full text-lg font-bold py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-md hover:shadow-xl transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </form>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9998]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md mx-4 shadow-lg text-center relative">
              <h3 className="text-2xl font-bold mb-3 text-green-600">Booking Confirmed!</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Your booking for <span className="font-semibold">{pkg.title}</span> on <span className="font-semibold">{selectedDate?.toDateString()}</span> has been successfully received.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="btn btn-primary w-full md:w-auto" onClick={() => { setModalOpen(false); navigate("/dashboard/bookings"); }}>
                  Go to My Bookings
                </button>
                <button className="btn btn-error w-full md:w-auto hover:bg-gray-200" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingForm;



