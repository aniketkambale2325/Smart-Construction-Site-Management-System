import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, updateProject, deleteProject } from '../../api/projectApi';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', endDate: '', status: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProjects = () =>
    getAllProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects'));

  useEffect(() => {
    loadProjects().finally(() => setLoading(false));
  }, []);

  const openEdit = (project) => {
    setEditingProject(project);
    setEditForm({
      name: project.name ?? '',
      endDate: project.endDate ? project.endDate.slice(0, 10) : '',
      status: project.status ?? '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject || saving) return;
    setSaving(true);
    setError('');
    try {
      await updateProject(editingProject.id, {
        name: editForm.name,
        endDate: editForm.endDate || null,
        status: editForm.status,
      });
      setEditingProject(null);
      await loadProjects();
    } catch {
      setError('Failed to update project');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await deleteProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading projects...</p>;
  }

  return (
    <div className="p-6">
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Projects</h1>
        <Link to="/projects/new" className="bg-emerald-700 text-white px-4 py-2">
          + New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white shadow-sm rounded p-4">
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-500">Status: {p.status}</p>
            <p className="text-sm text-gray-500">Start: {p.startDate}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openEdit(p)}
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(p)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
            <div className="flex gap-3 mt-2">
              <Link to={`/projects/${p.id}/sites`} className="text-emerald-700">
                View Sites &gt;
              </Link>
              <Link to={`/projects/${p.id}/expenses`} className="text-emerald-700">
                Expenses &gt;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Edit Project</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={editForm.endDate}
                  onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                  className="border rounded w-full p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  disabled={saving}
                  className="rounded border px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-emerald-700 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => !deleting && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  );
}
