import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Manage your tasks <br />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">TaskApp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The simple, secure, and scalable way to organize your life. 
            Built for developers who value speed and design.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="btn btn-primary text-lg px-8 py-3 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1">
              Get Started
            </Link>
            <Link href="/signup" className="btn btn-secondary text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Create Account
            </Link>
          </div>
        </div>
        
        {/* Subtle grid background or features can be added here */}
      </div>
    </main>
  );
}
