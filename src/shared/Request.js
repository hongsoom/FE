import axios from "axios";

const instance = axios.create({
  baseURL: "https://sparta-hj.site",
  headers: { Authorization: sessionStorage.getItem("token") },
});

export default instance;
