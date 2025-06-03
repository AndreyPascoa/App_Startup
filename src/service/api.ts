import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.20.112.1:3000',
  timeout: 5000,
});