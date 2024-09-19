import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("ADMIN_TOKEN");
        const response = await axios.get(
          "http://localhost:8000/adminpanel/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedUser = response.data
        .filter((user) => !user.is_staff)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setUsers(sortedUser)
        console.log(sortedUser);
        
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("ADMIN_TOKEN");
    await axios.delete(`http://localhost:8000/adminpanel/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleCreateUser = () => {
    navigate("/admin/create-user");  
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/update-user/${userId}`); 
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-center text-white px-5 py-3 rounded-md hover:bg-red-600 transition-colors">
            Logout  <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create New User 
          </button>
        </div>

        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex flex-col items-start space-y-3">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">Username : {user.username}</p>{" "}
                    {user.is_staff && (
                      <img
                        className="w-6 h-6"
                        src="https://cdn-icons-png.flaticon.com/128/6270/6270515.png"
                        alt=""
                      />
                    )}
                  </div>
                  {user.email && (
                    <p className="text-gray-600 font-semibold">
                      {" "}
                      <span className="text-gray-500 font-normal">Email</span> :{" "}
                      {user.email}
                    </p>
                  )}
                  {user.first_name && (
                    <p className="text-gray-600 font-semibold">
                      {" "}
                      <span className="text-gray-500 font-normal">Name</span> :{" "}
                      {user.first_name} {user.last_name}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};


export default AdminDashboard;
