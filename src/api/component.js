import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    getHeader()
    {
        return axios.get(`${API_URL}/component/header`)
    },
    search(formData)
    {
        return axios.post(`${API_URL}/component/search`, formData)
    }
}