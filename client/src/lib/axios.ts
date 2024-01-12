import axios from "axios";
import { env } from "./config";

const instance = axios.create({
  baseURL: env.API_SERVER,
});

export default instance;