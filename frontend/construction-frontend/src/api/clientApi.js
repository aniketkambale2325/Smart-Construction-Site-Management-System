import { dotnetApi } from "./axiosInstance";

export const getClients = () => dotnetApi.get("/clients").then((res) => res.data);
export const createClient = (data) => dotnetApi.post("/clients", data).then((res) => res.data);
export const updateClient = (id, data) => dotnetApi.put(`/clients/${id}`, data).then((res) => res.data);
export const deleteClient = (id) => dotnetApi.delete(`/clients/${id}`);