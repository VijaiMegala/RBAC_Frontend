import axios from "axios";

const API_BASE = "https://mockapi.example.com";

export const fetchUsers = async () => axios.get(`${API_BASE}/users`);
export const fetchRoles = async () => axios.get(`${API_BASE}/roles`);
export const updateUser = async (id, data) => axios.put(`${API_BASE}/users/${id}`, data);
export const createUser = async (data) => axios.post(`${API_BASE}/users`, data);
export const deleteUser = async (id) => axios.delete(`${API_BASE}/users/${id}`);
export const updateRole = async (id, data) => axios.put(`${API_BASE}/roles/${id}`, data);
export const createRole = async (data) => axios.post(`${API_BASE}/roles`, data);
