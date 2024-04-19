"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const userResponse = await fetch('/api/user');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        console.log('User data:', userData);

        if (userData.users && userData.users.length > 0) {
          const userWithEmail = userData.users.find((user) => user.email === session?.user?.email);
          if (userWithEmail) {
            console.log('User with matching email:', userWithEmail);

            const sellerResponse = await fetch('/api/seller');
            if (!sellerResponse.ok) {
              throw new Error('Failed to fetch seller data');
            }
            const sellerData = await sellerResponse.json();
            console.log('Seller data:', sellerData);

            const isSeller = sellerData.sellers.some((seller) => seller.user_id === userWithEmail._id);
            if (isSeller) {
              sessionStorage.setItem('sellerUserId', userWithEmail._id);
              console.log('Seller user ID stored in session storage:', sessionStorage.getItem('sellerUserId'));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData();
    }
  }, [status, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('Invalid Credentials');
        return;
      }

      router.replace('profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={'/register'}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
