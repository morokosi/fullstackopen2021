import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);
const create = (newObject) => axios.post(baseUrl, newObject);
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);
const delete_ = (id) => axios.delete(`${baseUrl}/${id}`);

const personCRU = {
  getAll,
  create,
  update,
  delete: delete_,
};

export default personCRU;
