import { dotnetApi } from "./axiosInstances";

export const getExpensesByProject = (projectId) =>
  dotnetApi.get(`/expenses/by-project/${projectId}`).then((res) => res.data);
export const createExpense = (data) => dotnetApi.post("/expenses", data).then((res) => res.data);