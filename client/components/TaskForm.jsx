"use client";
import { useState } from 'react';
import api from '../utils/api';

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', { title, description });
      onTaskAdded(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <span>✨</span> Create Task
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="What needs to be done?"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="Add some details..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full flex justify-center items-center gap-2">
           Add Task
        </button>
      </div>
    </form>
  );
}
