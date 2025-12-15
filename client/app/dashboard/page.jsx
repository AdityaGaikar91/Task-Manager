"use client";
import Navbar from '../../components/Navbar';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TaskForm onTaskAdded={handleTaskAdded} />
          </div>
          <div className="md:col-span-2">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </>
  );
}
