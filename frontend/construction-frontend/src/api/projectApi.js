import { dotnetApi } from './axiosInstances';

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