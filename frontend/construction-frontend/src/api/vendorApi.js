import { dotnetApi } from "./axiosInstance";

export const getVendors = () => dotnetApi.get("/vendors").then((res) => res.data);
export const createVendor = (data) => dotnetApi.post("/vendors", data).then((res) => res.data);
export const deleteVendor = (id) => dotnetApi.delete(`/vendors/${id}`);
