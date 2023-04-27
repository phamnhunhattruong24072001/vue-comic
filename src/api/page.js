import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    async getDataHomePage()
    {
        return await axios.get(`${API_URL}/page/home-page`);
    },
    async getDataDetailPage(slug)
    {
        return await axios.get(`${API_URL}/page/detail-page/${slug}`);
    },
    async getComicByGenre(slug)
    {
        return await axios.get(`${API_URL}/page/genre-comic/${slug}`);
    },
    async getComicByCategory(slug)
    {
        return await axios.get(`${API_URL}/page/category-comic/${slug}`);
    },
    async getComicByCountry(slug)
    {
        return await axios.get(`${API_URL}/page/country-comic/${slug}`);
    },
    async getComic()
    {
        return await axios.get(`${API_URL}/page/all-comic`);
    },
    async filterComicByGenre(formData)
    {
        return await axios.post(`${API_URL}/page/filter-genre-comic`, formData);
    },
    async getChapter(slugComic, slugChapter)
    {
        return await axios.get(`${API_URL}/page/read-page/${slugComic}/${slugChapter}`);
    },
}