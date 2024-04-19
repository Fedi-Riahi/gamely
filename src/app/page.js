"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { status , data: session } = useSession()
  console.log("Session:", session);

  useEffect(() => {
    // Log the user's email if authenticated and session is available
    if (status === "authenticated" && session) {
      console.log("User Email:", session?.user?.password);
      console.log("Session:", session);

    }
  }, [status, session]);

  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <h3>Gamely</h3>
      { status === "authenticated" ? (
        <span>{session?.user?.password}</span>
      ) : (
        <span>Not Authenticated</span>
      )}
    </main>
  );
}
