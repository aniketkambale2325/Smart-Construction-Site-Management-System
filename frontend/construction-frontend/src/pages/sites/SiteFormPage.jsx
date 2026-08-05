import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSite } from '../../api/siteApi';

export default function SiteFormPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [form, setForm] = useState({
    projectId: projectId || '',
    siteName: '',
    address: '',
    siteEngineerId: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSite({
        ...form,
        projectId: Number(form.projectId),
        siteEngineerId: Number(form.siteEngineerId),
      });

      navigate(`/projects/${form.projectId}/sites`);
    } catch {
      setError('Failed to create site — confirm the project and employee IDs exist');
    }
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-bold mb-4">New Site</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project ID</label>
          <input
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            className="border rounded w-full p-2"
            readOnly={Boolean(projectId)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Site Name</label>
          <input
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Site Engineer ID</label>
          <input
            name="siteEngineerId"
            value={form.siteEngineerId}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded">
          Create Site
        </button>
      </form>
    </div>
  );
}
