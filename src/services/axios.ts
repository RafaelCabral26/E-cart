import axios, { AxiosRequestConfig } from "axios";

const configure: AxiosRequestConfig = {
    baseURL: process.env.NODE_ENV === "production" ? "https://e-cart-api.onrender.com/" : "http://localhost:3000/",
    withCredentials: true,
    headers: process.env.NODE_ENV === "production" ? {
        "Access-Control-Allow-Origin": "http:localhost:3000/",
        "Content-Type": "application/json;charset=utf-8"
    }
        :
        {
            "Access-Control-Allow-Origin": "http:localhost:3000/",
            "Content-Type": "application/json;charset=utf-8"
        }
}

const http = axios.create(configure);
export default http;
