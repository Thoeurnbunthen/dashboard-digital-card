import { _envCons } from "@/constants";
import { getLocalDeviceInfo } from "@/constants/device.util";

import { CookieName } from "@/types";
import axios, { type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth-store";
// import { Store } from '@reduxjs/toolkit';

// export const injectStore = (_store: Store) => {};

const axiosInstance = axios.create({
  baseURL: _envCons.baseUrl, // Replace with your API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Add any other headers or configurations you need
  },
  // timeout: 1000,
});

interface RetryQueueItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //  const isLogin = useAppSelector((state) => state.auth.isLogin);
    // You can modify the request config here, e.g., add authentication headers
    // config.headers.Authorization = `Bearer ${getToken()}`;
    // const accessToken = Cookies.get("accessToken");
    const accessToken = useAuthStore.getState().accessToken;

    const device = getLocalDeviceInfo();
    config.headers["Authorization"] = `${accessToken}`;
    config.headers["x-device-id"] = device?.["x-device-id"];
    config.headers["x-device-type"] = device?.["x-device-type"];
    config.headers["x-device-token"] = device?.["x-device-token"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    return response.data;
  },
  async (error) => {
    const originalConfig: AxiosRequestConfig = error.config;
    if (
      error.response &&
      error.response.status === 401
      // && !originalConfig._retry
    ) {
      // originalConfig._retry = true;
      if (!isRefreshing) {
        try {
          // const refreshToken = Cookies.get(CookieName.REFRESH_TOKEN);
          // const refreshToken = useAuthStore.getState().refreshToken;
          const response = await axiosInstance({
            method: "POST",
            url: `${_envCons.baseUrl}/auth/refresh-token`,
            // data: {
            //   refreshToken: refreshToken,
            // },
          });
          const { accessToken } = response.data;
          Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          // return axiosInstance(originalRequest);
          return await axiosInstance(originalConfig);
          // const responsible = await axiosInstance(error.config);
          // return responsible.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (refreshError: any) {
          // Handle token refresh error
          // You can clear all storage and redirect the user to the login page
          if (refreshError.response && refreshError.response.data) {
            console.log("error 1");
            useAuthStore.getState().logout();
            return Promise.reject(refreshError.response.data);
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalConfig, resolve, reject });
      });
    }
    if (error.response && error.response.status === 403) {
      // Call the function to log out the user
      console.log("error 2");
      useAuthStore.getState().logout();

      return Promise.reject(error.response.data);
    }
    // Handle specific error cases here if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
