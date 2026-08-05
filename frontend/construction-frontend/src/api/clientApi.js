import { dotnetApi } from "./axiosInstances";

export const getClients = () => dotnetApi.get("/clients").then((res) => res.data);
export const createClient = (data) => dotnetApi.post("/clients", data).then((res) => res.data);