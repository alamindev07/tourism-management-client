import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const imageUploadApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageUploadApiKey}`;

const AddStory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const uploadImages = async (files) => {
    const uploadedImageUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(imageUploadURL, {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        console.log("Image Upload Result:", result); // Debug log

        if (result.success) {
          uploadedImageUrls.push(result.data.url);
        } else {
          toast.error("One of the images failed to upload.");
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        toast.error("Image upload failed.");
      }
    }
    return uploadedImageUrls;
  };

  const onSubmit = async (data) => {
    if (!imageUploadApiKey) {
      toast.error("IMGBB API key is missing.");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    toast.loading("Uploading story...");
    try {
      const imageUrls = await uploadImages(selectedFiles);

      if (imageUrls.length === 0) {
        toast.dismiss();
        toast.error("Image upload failed. Story not submitted.");
        return;
      }

      const story = {
        title: data.title,
        description: data.description,
        images: imageUrls,
        date: new Date(),
      };

      await axiosSecure.post("/api/stories", story);
      toast.dismiss();
      toast.success("Story added successfully!");
      reset();
      setPreviewImages([]);
      setSelectedFiles([]);
      navigate("/dashboard/manage-stories");
    } catch (error) {
      console.error("Failed to add story:", error);
      toast.dismiss();
      toast.error("Failed to add story");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Share Your Travel Story
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="A journey to remember..."
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold">Your Story</label>
          <textarea
            {...register("description", { required: true })}
            rows="5"
            placeholder="Tell us about your travel experience..."
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          ></textarea>
        </div>

        <div>
          <label className="text-gray-700 font-semibold block mb-1">
            Upload Photos
          </label>
          <label className="flex items-center justify-center px-4 py-6 bg-gray-100 border-2 border-dashed border-teal-400 rounded-lg cursor-pointer hover:bg-gray-200 transition-all">
            <FaCloudUploadAlt className="text-3xl text-teal-500 mr-3" />
            <span className="text-gray-700 font-medium">
              Select multiple images
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagePreview}
              className="hidden"
            />
          </label>
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg shadow-md border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
