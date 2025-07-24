

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sparkles } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const BookingForm = ({ pkg, onBookingSubmit, loading = false }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axiosSecure.get("/api/guides").then((res) => {
      setGuides(res.data);
    });
  }, [axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookingSubmit({
      packageId: pkg?._id,
      packageName: pkg?.title,
      price: pkg?.price,
      date: selectedDate,
      guideId: selectedGuide,
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      status: "pending",
    });
  };

  return (
    <section className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 justify-center">
        <Sparkles className="w-8 h-8 text-primary" />
        <h2 className="text-4xl font-extrabold text-center text-gradient-purple">
          Book Your Adventure
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Package Name */}
        <div className="md:col-span-2">
          <label className="label-text">Package Name</label>
          <input
            type="text"
            value={pkg?.title || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 focus:outline-primary"
          />
        </div>

        {/* Tourist Name */}
        <div>
          <label className="label-text">Your Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Tourist Email */}
        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Tourist Image URL */}
        <div className="md:col-span-2">
          <label className="label-text">Profile Image URL</label>
          <input
            type="text"
            value={user?.photoURL || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label-text">Price</label>
          <input
            type="text"
            value={`$${pkg?.price || ""}`}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="label-text">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            minDate={new Date()}
            placeholderText="Choose a date"
            className="input input-bordered w-full focus:outline-primary"
            required
          />
        </div>

        {/* Tour Guide Select */}
        <div className="md:col-span-2">
          <label className="label-text">Choose Tour Guide</label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            required
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              -- Select a guide --
            </option>
            {guides.length > 0 ? (
              guides.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))
            ) : (
              <option disabled>No guides found</option>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-lg font-bold py-3 rounded-xl transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-md hover:shadow-xl"
            }`}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookingForm;
