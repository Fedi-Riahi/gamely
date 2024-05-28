"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try { 
        console.log("Fetching user data...");
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        console.log("User data:", userData);

        if (userData.users && userData.users.length > 0) {
          const userWithEmail = userData.users.find(
            (user) => user.email === session?.user?.email
          );
          if (userWithEmail) {
            console.log("User with matching email:", userWithEmail);

            if (userWithEmail.role === "admin") {
              sessionStorage.setItem("adminToken", userWithEmail._id);
              console.log(
                "Admin token stored in session storage:",
                sessionStorage.getItem("adminToken")
              );
            } else {
              const sellerResponse = await fetch("/api/seller");
              if (!sellerResponse.ok) {
                throw new Error("Failed to fetch seller data");
              }
              const sellerData = await sellerResponse.json();
              console.log("Seller data:", sellerData);

              const isSeller = sellerData.sellers.some(
                (seller) => seller.user_id === userWithEmail._id
              );
              if (isSeller) {
                sessionStorage.setItem("sellerUserId", userWithEmail._id);
                console.log(
                  "Seller user ID stored in session storage:",
                  sessionStorage.getItem("sellerUserId")
                );
              } else {
                sessionStorage.setItem("buyerId", userWithEmail._id);
                console.log(
                  "Buyer user ID stored in session storage:",
                  sessionStorage.getItem("buyerId")
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (status === "authenticated" && session?.user?.email) {
      fetchUserData();
    }
  }, [status, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-white w-full">
      <div className="shadow-lg p-5 rounded-lg border border-gray-400  w-1/2">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <div className="w-full border border-gray-300 my-8 " />
        <span>I am a returning customer</span>
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
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="w-full border border-gray-300 my-8 " />
          <div className="flex items-center w-full justify-center gap-10">
            <p>If you don’t have an account</p>
            <Link
              className="w-1/4 text-center bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-tl-lg rounded-br-lg"
              href={"/register"}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
