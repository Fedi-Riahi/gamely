// EditAdmin.jsx
"use client"
import React, { useState } from "react";

const EditAdmin = ({ admin, onUpdate, onCancel }) => {
  const [email, setEmail] = useState(admin.email);
  const [password, setPassword] = useState(admin.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if needed
    const updatedAdmin = {
      ...admin,
      email: email,
      password: password,
    };
    onUpdate(updatedAdmin);
  };

  return (
    <div className="my-20">
      <h2 className="text-xl mb-4 font-medium">Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="flex items-center gap-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
