import axios, {AxiosRequestConfig} from "axios";

const configure:AxiosRequestConfig = {
    baseURL:"http://localhost:3000/",
    withCredentials:true,
    headers:{
        "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json;charset=utf-8",
        
    },
    
};
const http = axios.create(configure);
export default http;