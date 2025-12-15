"use client";
import { useState } from 'react';
import api from '../utils/api';

export default function TaskList({ tasks, setTasks }) {
  const [filter, setFilter] = useState('all');

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (err) {
      console.error('Error updating task', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field py-1 pr-8 text-sm"
          >
            <option value="all">View All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="card hover:shadow-lg transition-shadow duration-300 md:flex justify-between items-center gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${
                  task.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                  task.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-orange-50 text-orange-700 border-orange-200'
                }`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0 shrink-0">
               <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="input-field py-1 text-sm bg-gray-50 border-gray-200"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(task._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                title="Delete Task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
