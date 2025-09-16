// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// ---- Task APIs ----
export const getTasks = () => api.get("/get");
export const getTaskById = (id: string) => api.get(`/get/${id}`);
export const addTask = (task: {
  title: string;
  status: string;
  order: number;
}) => api.post("/add", task);

export const updateTask = (task: {
  id: string;
  title?: string;
  status?: string;
  order?: number;
}) => api.put(`/update/${task.id}`, task);

export const deleteTask = (id: string) => api.delete(`/delete/${id}`);

export const updateStatus = (id: string, status: string) =>
  api.put(`/update-status/${id}`, { status });

export default api;
