// src/pages/Dashboard/Admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users", err));
  }, [refresh]);

  const handleRoleChange = (email, newRole) => {
    axios.patch("http://localhost:5000/users/role", { email, role: newRole })
      .then(() => {
        alert("Role updated!");
        setRefresh(!refresh); // refresh the table
      })
      .catch((err) => console.error("Role update failed", err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <select
                    className="select select-bordered"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.email, e.target.value)}
                  >
                    <option value="tourist">Tourist</option>
                    <option value="tourguide">Tour Guide</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
