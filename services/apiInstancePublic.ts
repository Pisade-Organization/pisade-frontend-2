import axios from "axios";

const apiInstancePublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

export default apiInstancePublic;
