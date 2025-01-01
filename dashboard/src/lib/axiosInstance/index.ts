import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: `${envConfig.base_api}/api/v1`,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (config.headers) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
