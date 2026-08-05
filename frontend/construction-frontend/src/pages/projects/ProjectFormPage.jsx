import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projectApi';

export default function ProjectFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    clientId: '',
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject({
        ...form,
        clientId: Number(form.clientId)
      });

      navigate('/projects');
    } catch {
      setError('Failed to create project');
    }
  };

  return (
    <div className="p-6 max-w-lg">

      <h1 className="text-xl font-bold mb-4">
        New Project
      </h1>

      {error && (
        <p className="text-red-600 mb-3">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>
          <label className="block text-sm font-medium mb-1">
            Project Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Client ID
          </label>

          <input
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Date (optional)
          </label>

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>

      </form>
    </div>
  );
}