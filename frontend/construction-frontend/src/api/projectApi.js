import { dotnetApi } from './axiosInstance';

export async function getAllProjects() {
  const response = await dotnetApi.get('/projects');

  return response.data;
}

export async function createProject(projectData) {
  const response = await dotnetApi.post(
    '/projects',
    projectData
  );

  return response.data;
}

export async function getProjectById(id) {
  const response = await dotnetApi.get(
    `/projects/${id}`
  );

  return response.data;
}

export async function updateProject(id, projectData) {
  const response = await dotnetApi.put(`/projects/${id}`, projectData);
  return response.data;
}

export async function deleteProject(id) {
  await dotnetApi.delete(`/projects/${id}`);
}