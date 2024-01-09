import axios from "axios";
import { env } from "./config";

const instance = axios.create({
  baseURL: `http://${env.API_SERVER}:3000`,
});

export default instance;