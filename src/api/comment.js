import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('access_token');

export default {
    async addComment(formData)
    {
        return await axios.post(`${API_URL}/comment`, formData,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async getComment(comicId, page)
    {
        return await axios.get(`${API_URL}/comment/get-list/${comicId}?page=${page}`);
    },
}