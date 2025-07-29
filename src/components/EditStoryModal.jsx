
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const EditStoryModal = ({ story, onClose, refetch }) => {
  const [title, setTitle] = useState(story.title);
  const [description, setDescription] = useState(story.description);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleImageRemove = (url) => {
    setRemovedImages((prev) => [...prev, url]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleUpdate = async () => {
    setLoading(true); 
    try {
      let uploadedImageUrls = [];

      if (newImages.length > 0) {
        const uploads = newImages.map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
          );
        });

        const responses = await Promise.all(uploads);
        uploadedImageUrls = responses.map((res) => res.data.data.url);
      }

      const payload = {
        title,
        description,
        newImages: uploadedImageUrls,
        removeImages: removedImages,
      };

      await axiosInstance.put(`/api/stories/${story._id}`, payload);

      Swal.fire({
  title: "Story updated!",
  icon: "success",
  draggable: true
});

      refetch();
      onClose();
    } catch (err) {
      toast.error("Failed to update story");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl space-y-5 relative">
        <h2 className="text-2xl font-bold text-center text-teal-600">Edit Story</h2>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows={4}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <p className="font-medium text-gray-700">Current Images:</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {story.images
              .filter((url) => !removedImages.includes(url))
              .map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Story Image ${idx}`}
                    className="w-24 h-24 rounded object-cover border border-gray-300"
                  />
                  <button
                    onClick={() => handleImageRemove(url)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-sm px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <p className="font-medium text-gray-700">Add New Images:</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full mt-2"
          />
          {newImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {newImages.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded shadow"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className={`btn btn-success btn-sm flex items-center gap-2  ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            // disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm "></span>
            )}
            {loading ? "Story updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStoryModal;
