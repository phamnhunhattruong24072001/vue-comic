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
    async getComment(comicId, page)
    {
        return await axios.get(`${API_URL}/comment/get-list/${comicId}?page=${page}`);
    },
    async addComment(formData)
    {
        return await axios.post(`${API_URL}/comment`, formData);
    },
    async getComicByGenre(slug)
    {
        return await axios.get(`${API_URL}/page/genre-comic/${slug}`);
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