
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";   
import { toast } from "react-toastify";
import BookingForm from "./BookingForm";
import ImageGallery from "./ImageGallery";
import AboutTour from "./AboutTour";
import TourPlan from "./TourPlan";
import TourGuidesSection from "./TourGuidesSection";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth(); //  Firebase Auth context

  // Fetch package data
  const { data: pkg, isLoading: pkgLoading, isError: pkgError } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/packages/${id}`);
      return res.data;
    },
  });

  // Fetch tour guides
  const { data: guides = [], isLoading: guidesLoading, isError: guidesError } = useQuery({
    queryKey: ["tourguides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users?role=tourguide");
      return res.data;
    },
  });

  if (pkgLoading || guidesLoading)
    return <div className="text-center py-20">Loading...</div>;
  if (pkgError || guidesError)
    return <div className="text-center py-20 text-red-600">Error loading data.</div>;

  const handleBooking = async (formData) => {
    if (!user) {
      toast.error("Please login to book a package.");
      navigate("/login");
      return;
    }

    const bookingData = {
      packageId: pkg._id,
      packageName: pkg.title,
      packagePrice: pkg.price,
      tourGuideId: formData.tourGuideId,
      tourDate: formData.tourDate,
      touristName: user.displayName,
      touristEmail: user.email,
      status: "pending",
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
      {/* Back Button & Title */}
      <div className="relative flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-success text-white px-4 py-2 rounded"
        >
          ← Back
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl md:text-5xl font-extrabold">
          {pkg.title}
        </h1>
      </div>

      <ImageGallery pkg={pkg} />
      <AboutTour pkg={pkg} />
      <TourPlan pkg={pkg} />
      <TourGuidesSection guides={guides} />

      <BookingForm pkg={pkg} user={user} guides={guides} onBookingSubmit={handleBooking}  />

     
    </div>
  );
};

export default PackageDetailsPage;


