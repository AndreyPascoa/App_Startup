import axios from "axios";

export const API = axios.create({
    baseURL: "http://172.20.112.1:3000"
})