// AdminsList.jsx
"use client"
import React, { useState, useEffect } from "react";
import EditAdmin from "../editAdmin/EditAdmin";

const AdminsList = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        // Filter users with admin role
        const adminUsers = data.users.filter(user => user.role === 'admin');
        setAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleEditAdmin = (adminId) => {
    // Find the admin by id
    const admin = admins.find((admin) => admin._id === adminId);
    setEditingAdmin(admin);
  };

  const handleUpdateAdmin = (updatedAdmin) => {
    // Update the admin in the state
    const updatedAdmins = admins.map((admin) =>
      admin._id === updatedAdmin._id ? updatedAdmin : admin
    );
    setAdmins(updatedAdmins);
    // Clear the editingAdmin state
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      // Implement delete functionality for admin
      console.log(`Delete admin with id: ${adminId}`);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="my-20">
      <h2 className="text-xl mb-4 font-medium">Admins</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {admins.map((admin) => (
          <div
            key={admin._id}
            className="border border-gray-200 p-4 rounded-lg shadow-lg flex items-center gap-10"
          >
            <div className="mb-4">
              {/* Display admin picture */}
              <img
                src={`https://ui-avatars.com/api/?name=${admin.email}&background=random&size=100`}
                alt="Admin Avatar"
                className="rounded-full"
              />
            </div>
            <div className="text-center w-full">
              {/* Display admin email */}
              <h3 className="text-lg font-semibold mb-2 text-start text-black">
                Email: {admin.email}
              </h3>
              {/* Display admin password */}
              <p className="text-black mb-2 text-start">
                Password: {admin.password}
              </p>
              {/* Delete and edit admin buttons */}
              <div className="flex items-center justify-end w-full">
                <button
                  className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                  onClick={() => handleEditAdmin(admin._id)}
                >
                  Edit Admin
                </button>
                <button
                  className="mt-4 mr-2 text-md bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                  onClick={() => handleDeleteAdmin(admin._id)}
                >
                  Delete Admin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Render EditAdmin component if editingAdmin exists */}
      {editingAdmin && (
        <EditAdmin admin={editingAdmin} onUpdate={handleUpdateAdmin} />
      )}
    </div>
  );
};

export default AdminsList;
