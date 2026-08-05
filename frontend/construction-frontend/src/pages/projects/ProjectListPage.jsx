import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../api/projectApi';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading projects...</p>;
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Projects</h1>

        <Link
          to="/projects/new"
          className="bg-emerald-700 text-white px-4 py-2"
        >
          + New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm rounded p-4"
          >
            <h2 className="font-semibold">{p.name}</h2>

            <p className="text-sm text-gray-500">
              Status: {p.status}
            </p>

            <p className="text-sm text-gray-500">
              Start: {p.startDate}
            </p>

            <Link
              to={`/sites?projectId=${p.id}`}
              className="text-emerald-700"
            >
              View Sites &gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}