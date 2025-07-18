


import React from "react";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newPackage) => axiosSecure.post("/api/packages", newPackage),
    onSuccess: () => {
      toast.success("🎉 Package added successfully!");
      reset();
      queryClient.invalidateQueries(["randomPackages"]);
    },
    onError: () => toast.error("❌ Failed to add package"),
  });

  const onSubmit = (data) => {
    try {
      data.images = data.images.split(",").map((url) => url.trim());
      data.price = Number(data.price);
      mutate(data);
    } catch (error) {
      toast.error("Invalid input data");
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 p-8 rounded-3xl shadow-lg border border-blue-100">
        <h2 className="text-4xl font-bold text-center text-sky-600 mb-8">
          ✈️ Add New Travel Package
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="label font-semibold text-sky-700">Title</label>
            <input
              {...register("title")}
              placeholder="Package title"
              className="input input-bordered w-full focus:ring focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="label font-semibold text-sky-700">Price (BDT)</label>
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="input input-bordered w-full focus:ring focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="label font-semibold text-sky-700">Duration</label>
            <input
              {...register("duration")}
              placeholder="e.g., 7 days"
              className="input input-bordered w-full focus:ring focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="label font-semibold text-sky-700">Location</label>
            <input
              {...register("location")}
              placeholder="e.g., Bandarban, Bangladesh"
              className="input input-bordered w-full focus:ring focus:ring-sky-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold text-sky-700">Images</label>
            <input
              {...register("images")}
              placeholder="Paste image URLs, separated by commas"
              className="input input-bordered w-full focus:ring focus:ring-sky-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold text-sky-700">Category</label>
            <select
              {...register("category")}
              className="select select-bordered w-full focus:ring focus:ring-sky-300"
              required
            >
              <option value="">Select a category</option>
              <option value="Adventure">Adventure</option>
              <option value="Leisure">Leisure</option>
              <option value="Cultural">Cultural</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold text-sky-700">Description</label>
            <textarea
              {...register("description")}
              placeholder="Write a short description about the travel experience..."
              className="textarea textarea-bordered w-full focus:ring focus:ring-sky-300"
              rows="4"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn w-full text-white text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                isLoading
                  ? "loading btn-disabled bg-sky-300"
                  : "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-blue-700 hover:to-sky-700"
              }`}
            >
              <FaPaperPlane />
              {isLoading ? "Submitting..." : "Submit Package"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddPackage;
