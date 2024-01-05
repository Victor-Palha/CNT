import axios from "axios";

const instance = axios.create({
  baseURL: "http://25.0.154.188:3000",
});

export default instance;