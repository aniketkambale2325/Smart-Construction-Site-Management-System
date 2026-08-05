import { dotnetApi } from "./axiosInstances";

export const getMaterials = () => dotnetApi.get("/materials").then((res) => res.data);
export const getLowStock = () => dotnetApi.get("/materials/low-stock").then((res) => res.data);
export const createMaterial = (data) => dotnetApi.post("/materials", data).then((res) => res.data);
export const requestMaterial = (data) => dotnetApi.post("/materials/request", data).then((res) => res.data);
export const updateRequestStatus = (requestId, status) =>
  dotnetApi.put(`/materials/request/${requestId}/status`, { status }).then((res) => res.data);