"use client";
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Force reload to update navbar state (or use context in a real app, but here simple reload works)
      window.location.href = '/dashboard'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="card w-full max-w-md animate-in fade-in zoom-in duration-300">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">Welcome Back</h1>
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <a href="/signup" className="text-primary hover:underline font-medium">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
