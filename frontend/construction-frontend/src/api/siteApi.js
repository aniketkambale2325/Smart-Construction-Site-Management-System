import { dotnetApi } from './axiosInstance';

export async function getSitesByProject(projectId) {
  const response = await dotnetApi.get(`/sites/by-project/${projectId}`);
  return response.data;
}

export async function createSite(siteData) {
  const response = await dotnetApi.post('/sites', siteData);
  return response.data;
}

export async function uploadSitePhoto(siteId, file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await dotnetApi.post(
    `/sites/${siteId}/daily-reports/upload-photo`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data.url;
}

export async function addDailyReport(siteId, data) {
  const response = await dotnetApi.post(`/sites/${siteId}/daily-reports`, {
    description: data.description,
    imageUrls: data.imageUrls,
    percentComplete: data.percentComplete,
  });
  return response.data;
}

export async function deleteSite(id) {
  await dotnetApi.delete(`/sites/${id}`);
}
