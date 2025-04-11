import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { API_CONFIG } from "../config/api.config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
