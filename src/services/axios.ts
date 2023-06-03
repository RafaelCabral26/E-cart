import axios, {AxiosRequestConfig} from "axios";

const configure:AxiosRequestConfig = {
    baseURL:"https://e-cart-api.onrender.com/",
    withCredentials:true,
    headers:{
        "Access-Control-Allow-Origin":"https://e-cart-api.onrender.com/",
        "Content-Type": "application/json;charset=utf-8",
        
    },
    
};
const configureDevelopment:AxiosRequestConfig = {
    baseURL:"https://e-cart-api.onrender.com/",
    withCredentials:true,
    headers:{
        "Access-Control-Allow-Origin":"http://localhost:3000",
        "Content-Type": "application/json;charset=utf-8",
        
    },
    
};
const http = axios.create(configure);
export default http;
