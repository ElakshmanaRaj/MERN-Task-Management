import axios from "axios";
import {BASE_URL} from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
    },
  });
  
  // Keep this so JSON still works, but remove Content-Type for FormData
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            if(error.response.status === 401) {
                window.location.href = "/login";
            } else if(error.response.status === 500){
                console.error("Server Error, Please try again later")
            } else if(error.response.status === "ECNNBOARTTE"){
                console.error("Request Timeout, Please try again later")
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;