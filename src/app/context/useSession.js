// useSession.js
import { useEffect } from "react";
import { useSession as useNextAuthSession } from "next-auth/react";

function useSession() {
  const { data: session } = useNextAuthSession();

  useEffect(() => {
    // Add event listener for logout event
    const handleLogout = () => {
      localStorage.removeItem("cartItems"); // Clear cart items from local storage
    };

    if (!session) {
      // User is not logged in
      window.addEventListener("logout", handleLogout);
    }

    return () => {
      // Cleanup: remove event listener
      window.removeEventListener("logout", handleLogout);
    };
  }, [session]);

  return session;
}

export default useSession;
