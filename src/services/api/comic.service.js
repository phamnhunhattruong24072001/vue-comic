import axiosService from "../axiosService";
import { get } from "lodash";

export default {
    async getDataHomePage()
    {
        const response =  await axiosService.get(`/page/home-page`);
        return get(response, "data", []);
    },
    async getDataDetailPage(slug)
    {
        const response = await axiosService.get(`/page/detail-page/${slug}`);
        return get(response, "data", []);
    },
    async getComicByGenre(slug)
    {
        const response = await axiosService.get(`/page/genre-comic/${slug}`);
        return get(response, "data", []);
    },
    async getComicByCategory(slug)
    {
        const response = await axiosService.get(`/page/category-comic/${slug}`);
        return get(response, "data", []);
    },
    async getComicByCountry(slug)
    {
        const response = await axiosService.get(`/page/country-comic/${slug}`);
        return get(response, "data", []);
    },
    async getComic(type)
    {
        const response = await axiosService.post(`/page/all-comic`, {
            type
        });
        return get(response, "data", []);
    },
    async filterComicByGenre(formData)
    {
        const response = await axiosService.post(`/page/filter-genre-comic`, formData);
        return get(response, "data", []);
    },
    async getChapter(slugComic, slugChapter)
    {
        const response = await axiosService.get(`/page/read-page/${slugComic}/${slugChapter}`);
        return get(response, "data", []);
    },
}