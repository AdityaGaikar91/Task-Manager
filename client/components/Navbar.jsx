"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          TaskApp
        </Link>
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-gray-600 hover:text-red-500 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary text-sm px-4 py-2">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
