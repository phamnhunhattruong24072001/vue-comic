import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    register(data)
    {
        return axios.post(`${API_URL}/auth/register`, data)
    },
    login(data)
    {
        return axios.post(`${API_URL}/auth/login`, data)
    }
}