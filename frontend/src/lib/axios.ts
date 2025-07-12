import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: 'https://spotify-clone-mern.vercel.app/api',
});