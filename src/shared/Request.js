import axios from "axios";

const instance = axios.create({
  baseURL: "http://sparta-hj.site",
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
