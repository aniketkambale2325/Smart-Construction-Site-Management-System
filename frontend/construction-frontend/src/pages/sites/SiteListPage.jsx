import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSitesByProject, deleteSite } from '../../api/siteApi';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function SiteListPage() {
  const { projectId } = useParams();
  const [sites, setSites] = useState([]);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadSites = () => {
    if (projectId) {
      return getSitesByProject(projectId)
        .then(setSites)
        .catch(() => setError('Failed to load sites'));
    }
    return Promise.resolve();
  };

  useEffect(() => {
    loadSites();
  }, [projectId]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await deleteSite(deleteTarget.id);
      setSites((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError('Failed to delete site');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Sites</h1>
        <Link
          to={`/projects/${projectId}/sites/new`}
          className="bg-emerald-700 text-white px-4 py-2 rounded"
        >
          + New Site
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sites.map((site) => (
          <div key={site.id} className="bg-white shadow-sm rounded p-4">
            <h2 className="font-semibold">{site.siteName}</h2>
            <p className="text-sm text-gray-500">{site.address}</p>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(site)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
            <div className="flex gap-3 mt-2">
              <Link
                to={`/sites/${site.id}/daily-reports`}
                className="text-emerald-700"
              >
                Daily Report &gt;
              </Link>
              <Link
                to={`/sites/${site.id}/reports`}
                className="text-emerald-700"
              >
                AI Reports &gt;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => !deleting && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  );
}
