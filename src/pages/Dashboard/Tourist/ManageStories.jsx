
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import EditStoryModal from "../../../components/EditStoryModal";
import Swal from "sweetalert2";
import LoadingSpinner from "../../LoadingSpiner/LoadingSpinner";

const ManageStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user stories
  const refetch = () => {
    if (!user?.email) {
      setLoading(false); // prevent spinner from hanging
      return;
    }

    setLoading(true);
    axiosSecure
      .get(`/api/stories/user/${user.email}`)
      .then((res) => setStories(res.data))
      .catch(() => toast.error("Failed to fetch your stories"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email]);

  // Delete handler with SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#3182ce",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/stories/${id}`);
        setStories((prev) => prev.filter((story) => story._id !== id));
        toast.success("Story deleted successfully");
      } catch (err) {
        toast.error("Failed to delete story");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-700">
        📖 Manage Your Stories
      </h2>

      {/* Loading Spinner */}
      {loading ? (
        <div className="">
          <LoadingSpinner />
        </div>
      ) : stories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't added any stories yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
  <div
    key={story._id}
    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition"
  >
    <div className="w-full h-60 overflow-hidden rounded-t-xl">
      <img
        src={story.images?.[0]}
        alt="Story"
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </div>

    <div className="p-4 space-y-2">
      <h3 className="text-xl font-semibold text-teal-700 truncate">
        {story.title}
      </h3>
      <p className="text-gray-600 line-clamp-3 text-sm">{story.description}</p>

      <div className="flex justify-between items-center pt-3">
        <button
          onClick={() => setSelectedStory(story)}
          className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => handleDelete(story._id)}
          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
))}

        </div>
      )}

      {/* Edit Modal */}
      {selectedStory && (
        <EditStoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageStories;
