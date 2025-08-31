import axios from "axios";

const BASE_URL = "https://phinmon-be.vercel.app/api/v1/user";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
