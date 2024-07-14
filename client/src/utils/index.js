import axios from "axios";

const productionUrl = import.meta.env.VITE_PRODUCTION_URL || "http://localhost:5000/api/v1";

axios.defaults.withCredentials=true;
export const customFetch = axios.create({
    baseURL:productionUrl,
    withCredentials:true,
})