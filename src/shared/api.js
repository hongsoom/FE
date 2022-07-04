import axios from "axios";

const apiform = axios.create({
  url: "http://sparta-hj.site",
  headers: { "Content-Type": "multipart/form-data" }
});

export default apiform 