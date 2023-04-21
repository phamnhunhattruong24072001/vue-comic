import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    async getDataHomePage()
    {
        return await axios.get(`${API_URL}/page/home-page`)
    },
    async getDataDetailPage(slug)
    {
        return await axios.get(`${API_URL}/page/detail-page/${slug}`)
    },
}