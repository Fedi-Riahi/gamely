import SignInButton from "@/components/SignInButton/SignInButton";
import Register from "@/components/authentication/Register";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      Gamely
      <SignInButton />
      <Register />
    </main>
  );
}
