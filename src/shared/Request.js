import axios from "axios";

const instance = axios.create({
  baseURL: "http://sparta-hj.site:8080",
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
