import {dotnetApi} from './axiosInstance';

export const getDashboardSummary = () =>
     dotnetApi.get('/dashboard/summary').then((response) => 
        response.data);

export const getProjectProgressChart = () =>
  dotnetApi.get("/dashboard/charts/project-progress").then((res) => 
    res.data);

export const getExpenseByCategoryChart = () =>
  dotnetApi.get("/dashboard/charts/expense-by-category").then((res) => 
    res.data);