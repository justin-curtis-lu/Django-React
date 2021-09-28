import http from "../http-common";

const getAll = () => {
  return http.get("/jobs");
};

const get = id => {
  return http.get(`/jobs/${id}`);
};

const create = data => {
  return http.post("/jobs", data);
};

const update = (id, data) => {
  return http.put(`/jobs/${id}`, data);
};

const remove = id => {
  return http.delete(`/jobs/${id}`);
};

const removeAll = () => {
  return http.delete(`/jobs`);
};

const findByPosition = position => {
  return http.get(`/jobs?position=${position}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByPosition
};