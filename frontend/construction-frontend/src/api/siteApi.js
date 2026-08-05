import { dotnetApi } from './axiosInstances';

export async function getSitesByProject(projectId) {
  const response = await dotnetApi.get(
    `/sites/by-project/${projectId}`
  );

  return response.data;
}

export async function createSite(siteData) {
  const response = await dotnetApi.post(
    '/sites',
    siteData
  );

  return response.data;
}