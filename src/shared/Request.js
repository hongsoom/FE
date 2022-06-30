import axios from "axios";

const instance  = axios.create({
  baseURL: "http://sparta-hj.site",
})

export default instance