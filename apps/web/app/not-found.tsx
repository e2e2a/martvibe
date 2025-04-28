'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const NotFound = () => {
  const { data: session } = useSession();
  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
      {session ? (
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      ) : (
        <Link href="/signin" className="text-blue-500 hover:underline">
          Go back to Signin
        </Link>
      )}
    </div>
  );
};

export default NotFound;
