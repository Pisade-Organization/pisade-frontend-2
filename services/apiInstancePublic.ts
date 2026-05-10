import axios from "axios";
import { getApiBaseUrl } from "@/services/apiBaseUrl";

const apiInstancePublic = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: false,
  timeout: 10000,
});

export default apiInstancePublic;
