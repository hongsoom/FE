import axios from "axios";

const instance  = axios.create({
  baseURL: "http://sparta-hj.site",
  headers: { "Content-Type": "application/json" },
})

export default instance 