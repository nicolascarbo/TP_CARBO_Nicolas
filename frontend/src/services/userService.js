import axios from "axios";

const api = axios.create({
  baseURL: "/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

const userService = {
  getAll: (params) => {
    return api.get("/", { params });
  },

  getById: (id) => {
    return api.get(`/${id}`);
  },

  create: (data) => {
    return api.post("/", data);
  },

  update: (id, data) => {
    return api.put(`/${id}`, data);
  },

  remove: (id) => {
    return api.delete(`/${id}`);
  },
};

export default userService;
