import { useEffect, useState } from 'react';
import {
  useSearchParams,
  Link
} from 'react-router-dom';

import { getSitesByProject } from '../../api/siteApi';

export default function SiteListPage() {
  const [searchParams] = useSearchParams();

  const projectId =
    searchParams.get('projectId');

  const [sites, setSites] = useState([]);

  useEffect(() => {
    if (projectId) {
      getSitesByProject(projectId)
        .then(setSites);
    }
  }, [projectId]);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-xl font-bold">
          Sites
        </h1>

        <Link
          to="/sites/new"
          className="bg-emerald-700 text-white px-4 py-2 rounded"
        >
          + New Site
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {sites.map((site) => (

          <div
            key={site.id}
            className="bg-white shadow-sm rounded p-4"
          >

            <h2 className="font-semibold">
              {site.siteName}
            </h2>

            <p className="text-sm text-gray-500">
              {site.address}
            </p>

            <Link
              to={`/sites/${site.id}/daily-report`}
              className="text-emerald-700"
            >
              Submit Daily Report &gt;
            </Link>

          </div>

        ))}

      </div>
    </div>
  );
}