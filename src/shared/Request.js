import axios from "axios";

const instance = axios.create({
  baseURL: "https://sparta-hj.site",
  headers: { Authorization: localStorage.getItem("token") },
});

export default instance;
