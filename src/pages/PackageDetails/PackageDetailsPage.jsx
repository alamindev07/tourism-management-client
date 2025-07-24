
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import BookingForm from "./BookingForm";
import ImageGallery from "./ImageGallery";
import AboutTour from "./AboutTour";
import TourPlan from "./TourPlan";
import TourGuidesSection from "./TourGuidesSection ";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch package data by ID
  const {
    data: pkg,
    isLoading: pkgLoading,
    isError: pkgError,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/packages/${id}`);
      return res.data;
    },
  });

  // Fetch all tour guides
  const {
    data: guides = [],
    isLoading: guidesLoading,
    isError: guidesError,
  } = useQuery({
    queryKey: ["tourguides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users?role=tourguide");
      return res.data;
    },
  });

  // Dummy user example (Replace with AuthContext)
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (pkgLoading || guidesLoading)
    return <div className="text-center py-20">Loading...</div>;
  if (pkgError)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading package data.
      </div>
    );
  if (guidesError)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading tour guides.
      </div>
    );

  // Booking form submit
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a package.");
      navigate("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a tour date.");
      return;
    }
    if (!selectedGuide) {
      toast.error("Please select a tour guide.");
      return;
    }

    const bookingData = {
      packageId: pkg._id,
      packageTitle: pkg.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: pkg.price,
      tourDate: selectedDate.toISOString(),
      tourGuideId: selectedGuide,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/api/bookings", bookingData);
      if (res.data.insertedId) {
        setModalOpen(true);
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking error. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-14 space-y-12">
     <div className="relative flex items-center justify-between mb-8">
  {/* Back Button at start */}
  <button
    onClick={() => navigate(-1)}
    className="btn btn-success text-white px-4 py-2 rounded hover:bg-primary-dark transition"
  >
    ← Back
  </button>

  {/* Title centered absolutely */}
  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-700">
    {pkg.title}
  </h1>
</div>

      

    

      {/* Image gallery */}
      <ImageGallery pkg={pkg} />


      {/* About the Tour */}
     
        <AboutTour pkg={pkg} />


      {/* Tour Plan */}
        <TourPlan pkg={pkg} />
    

      {/* Tour Guides Section */}
        <TourGuidesSection guides={guides} />

      {/* Booking Form */}
      <BookingForm
        pkg={pkg}
        user={user}
        guides={guides}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedGuide={selectedGuide}
        setSelectedGuide={setSelectedGuide}
        onBookingSubmit={handleBooking}
        loading={false} // You can replace with actual mutation loading
      />

      {/* Booking Success Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md mx-4 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
            <p className="mb-6">
              Your booking for{" "}
              <span className="font-semibold">{pkg.title}</span> on{" "}
              <span className="font-semibold">
                {selectedDate?.toLocaleDateString()}
              </span>{" "}
              has been received.
            </p>
            <button
              className="btn btn-success"
              onClick={() => {
                setModalOpen(false);
                navigate("/dashboard/bookings");
              }}
            >
              Go to My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetailsPage;
