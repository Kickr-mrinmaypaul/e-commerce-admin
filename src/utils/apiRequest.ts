import axios from "axios";
import { baseURL } from "@/utils/networkConfig"

const api = axios.create({
    baseURL,
});


api.interceptors.request.use(
    
    function(config){
        const token = localStorage.getItem("authToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }


        if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      // Axios will auto-set multipart/form-data with boundary
    } else {
      config.headers["Content-Type"] = "application/json";
    }

        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)


api.interceptors.response.use(
    function(response){
        return response;
    },

    function(error){
        console.error("API error :", error?.response?.data || error?.message);
        return Promise.reject(error);
    }
)

export default api;