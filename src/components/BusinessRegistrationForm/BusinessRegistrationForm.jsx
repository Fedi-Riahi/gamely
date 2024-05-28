"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BusinessRegistrationForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    address: "",
    phone: "",
    businessEntityType: "individual",
    businessName: "",
    registrationNumber: "",
    taxNumber: "",
  });

  useEffect(() => {
    // Fetch user data from API and set initial user ID if available
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const sessionUserEmail = session?.user?.email;
        const foundUser = data.users.find(
          (user) => user.email === sessionUserEmail
        );
        if (foundUser) {
          setFormData((prevState) => ({ ...prevState, userId: foundUser._id }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register as a seller");
      }

      const responseData = await response.json();
      console.log("Seller registered successfully:", responseData.seller);

      // Set sellerUserId in session storage upon successful registration
      sessionStorage.setItem("sellerUserId", formData.userId);

      // Reset the form data
      setFormData({
        userId: "",
        name: "",
        address: "",
        phone: "",
        businessEntityType: "individual",
        businessName: "",
        registrationNumber: "",
        taxNumber: "",
      });
    } catch (error) {
      console.error("Error registering as a seller:", error);
    }
  };

  return (
    <div className="grid place-items-center h-1/2 bg-white w-full">
      <div className="shadow-lg p-5 rounded-lg border border-gray-400 w-full ">
        <h1 className="text-xl font-bold my-4">Business Registration</h1>
        <div className="w-full border border-gray-300 my-8 " />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center"
        >
          <input type="hidden" name="userId" value={formData.userId} />

          <div className="mb-4 w-full">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="py-3 px-2 w-full border border-gray-300"
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="businessEntityType" className="block">
              Business Entity Type:
            </label>
            <select
              id="businessEntityType"
              name="businessEntityType"
              value={formData.businessEntityType}
              onChange={handleChange}
              className="py-3 px-2 w-full border border-gray-300"
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </div>

          {formData.businessEntityType === "company" && (
            <>
              <div className="mb-4 w-full">
                <label htmlFor="registrationNumber" className="block">
                  Registration Number:
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                  className="py-3 px-2 w-full border border-gray-300"
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="taxNumber" className="block">
                  Tax Number:
                </label>
                <input
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  required
                  className="py-3 px-2 w-full border border-gray-300"
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="address" className="block">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="py-3 px-2 w-full border border-gray-300"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-center w-full my-4">
            <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
