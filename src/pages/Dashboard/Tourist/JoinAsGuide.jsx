

// src/pages/Dashboard/Tourist/JoinAsGuide.jsx

import { useForm } from "react-hook-form";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const JoinAsGuide = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    const application = {
      uid: user?.uid,
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      role: "tourist", // default
      title: data.title,
      reason: data.reason,
      cvLink: data.cvLink,
    };

    try {
      const res = await axiosSecure.post("/api/apply-tourguide", application);
      if (res.data?.insertedId) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Failed to submit application", error);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-white via-green-50 to-emerald-100 min-h-screen">
      <div className="text-center mb-10">
        <TypeAnimation
          sequence={[
            "Apply to Become a Tour Guide 🌍",
            2000,
            "Share Your Passion for Travel 🧭",
            2000,
            "Submit Your Application Today ✍️",
            2000,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-emerald-700"
        />
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          We’re excited to have passionate guides like you! Fill in the details below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 border border-emerald-100"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Application Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Ex: Passionate Explorer of Nature"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register("reason", { required: true })}
            rows={5}
            placeholder="Tell us about your travel experience, goals, and why you'd be a great guide."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">CV Link (Drive/Portfolio)</label>
          <input
            type="url"
            {...register("cvLink", { required: true })}
            placeholder="https://drive.google.com/your-cv"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn px-6 py-2 bg-emerald-600 hover:bg-orange-500 text-white rounded-full transition-all"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <>
          <input type="checkbox" id="success-modal" className="modal-toggle" checked readOnly />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center">
              <h3 className="font-bold text-lg text-green-600">Application Submitted ✅</h3>
              <p className="py-4 text-gray-600">We’ll review your application shortly. Thank you!</p>
              <div className="modal-action justify-center">
                <label
                  htmlFor="success-modal"
                  className="btn bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={() => setIsSuccess(false)}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JoinAsGuide;
