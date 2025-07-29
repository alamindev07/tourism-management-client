import { useEffect, useState } from "react";
import { FaUserEdit, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineVerifiedUser } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../LoadingSpiner/LoadingSpinner";
import RoleMessage from "../../../components/RoleMessage";

const UpdateAdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", photoURL: "", phone: "" });
  const [openModal, setOpenModal] = useState(false);

  // Fetch stats
  useEffect(() => {
    axiosSecure
      .get("/api/admin-dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Failed to fetch stats", err);
      });
  }, [axiosSecure]);

  // Fetch admin profile data
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/users/${user.email}`).then((res) => {
        const fetchedUser = res.data.user;
        setDbUser(fetchedUser);

        setEditData({
          name: fetchedUser.name || "",
          photoURL: fetchedUser.photoURL || "",
          phone: fetchedUser.phone || "",
        });
      });
    }
  }, [user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/api/users/${user.email}`, editData);
      Swal.fire({ title: "Profile updated!", icon: "success" });
      setOpenModal(false);

      // Refetch updated data
      const res = await axiosSecure.get(`/api/users/${user.email}`);
      setDbUser(res.data.user);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (!dbUser || !stats) return <div className="py-10 text-center"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Greeting */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#003B73]">
        Welcome back, <span className="text-green-500">{dbUser.name}</span>!
      </h2>

      {/* Stats Cards */}
      <div className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-600">{stats.totalPayment}৳</p>
          <p className="text-gray-500">Total Payments</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalTourGuides}</p>
          <p className="text-gray-500">Tour Guides</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.totalPackages}</p>
          <p className="text-gray-500">Packages</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.totalClients}</p>
          <p className="text-gray-500">Clients</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-indigo-600">{stats.totalStories}</p>
          <p className="text-gray-500">Stories</p>
        </div>
      </div>

      {/* Admin Profile Section */}
      <div className="bg-[#f5faff] border border-[#cde5ff] rounded-2xl p-6 md:flex items-center gap-6 shadow-md">
        <div className="flex-shrink-0">
          <img
            src={dbUser.photoURL}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-[#0077b6]"
          />
        </div>

        <div className="mt-4 md:mt-0 flex-1 space-y-2 font-bold">
          <p className="flex items-center text-lg">
            User Email <MdEmail className="text-[#0077b6] ml-2 mr-1" /> :
            <span className="ml-1 text-green-500 font-semibold">{dbUser.email}</span>
          </p>
          <p className="flex items-center text-lg font-bold">
            User Role <MdOutlineVerifiedUser className="text-[#0077b6] ml-2 mr-1" /> :
            <span className="capitalize font-normal ml-1 text-red-500">{dbUser.role}</span>
          </p>
          <p className="flex items-center text-lg font-bold">
            Phone No <FaPhoneAlt className="text-[#0077b6] ml-2 mr-1" /> :
            <span className="ml-1 font-semibold">{dbUser.phone || "Not set"}</span>
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-4 btn btn-outline btn-info flex items-center gap-2"
          >
            <FaUserEdit />
            Edit Profile
          </button>
        </div>
      </div>

          {/* Apply as tour guide */}
         <RoleMessage role={dbUser.role}  />

      {/* Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
            <h3 className="text-xl font-semibold mb-4 text-[#0077b6]">Edit Your Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Image URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editData.photoURL}
                  onChange={(e) => setEditData({ ...editData, photoURL: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-info text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAdminProfile;
