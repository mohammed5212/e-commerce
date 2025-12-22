// import axios from "axios";

// const url = import.meta.env.VITE_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: url,
//   withCredentials: true,
//   // Remove Content-Type here
// });

// export { axiosInstance };

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axiosInstance };
