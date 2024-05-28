// UsersList.jsx
"use client";
import React, { useState, useEffect } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`/api/user/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="my-20">
      <h2 className="text-xl mb-4 font-medium">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className=" border border-gray-200 p-4 rounded-lg shadow-lg flex items-center gap-10"
          >
            <div className="mb-4">
              {/* Display user picture */}
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}&background=random&size=100`}
                alt="User Avatar"
                className="rounded-full"
              />
            </div>
            <div className="text-center w-full">
              {/* Display user name */}
              <h3 className="text-lg font-semibold mb-2 text-start text-black">
                {user.email}
              </h3>
              {/* Display user role */}
              <p className="text-black mb-2 text-start">
                Role: {user.role || "user"}
              </p>
              {/* Delete user button */}
              <div className="flex items-center justify-end w-full">
                <button
                  className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
