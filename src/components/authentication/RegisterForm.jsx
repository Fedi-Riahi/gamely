"use client";
import { useState } from "react";
import SignInButton from "../SignInButton/SignInButton";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password ,role: "visitor"}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      console.log("User registered successfully");
      // Handle success
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-white w-full">
      <div className="shadow-lg p-5 rounded-lg border border-gray-400  w-1/2">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <div className="w-full border border-gray-300 my-8 " />
        <form
          onSubmit={handleSubmit}
          className="flex  flex-col w-full items-center"
        >
          <div className="flex items-center justify-between w-full gap-10 my-8">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="py-3 px-2 w-full border border-gray-300"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="py-3 px-2 w-full border border-gray-300"
            />
          </div>
          <button className=" w-1/2 mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-tl-lg rounded-br-lg">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="w-full border border-gray-300 my-8 " />
          <div className="flex items-center w-full justify-center gap-10">
            <SignInButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
