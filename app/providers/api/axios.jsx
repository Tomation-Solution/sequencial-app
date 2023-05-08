import axios from "axios";
import { url } from "./config/constants";

export default axios.create({
    baseURL: url.BASE_URL,
    mode: 'no-cors',
});

export const axiosPrivate = axios.create({
    baseURL: url.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})