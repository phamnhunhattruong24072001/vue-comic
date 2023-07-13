import comicService from "@/services/api/comic.service";
import { formatDate } from '@/helpers/index';

export default {
    getDataGenre: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByGenre(slug);
            const comics = response.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataGenre', {
                comics: comics,
                genres: response.genres,
                genre: response.genre,
                lastPage: response.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getDataCountry: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByCountry(slug);
            const comics = response.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataCountry', {
                comics: comics,
                countries: response.countries,
                country: response.country,
                lastPage: response.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getDataCategory: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByCategory(slug);
            const comics = response.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataCategory', {
                comics: comics,
                categories: response.categories,
                category: response.category,
                lastPage: response.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAllComic: async ({ commit }, type) => {
        try {
            const response = await comicService.getComic(type);
            const comics = response.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataAllComic', {
                comics: comics,
                categories: response.categories,
                countries: response.countries,
                genres: response.genres,
                lastPage: response.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    filterData: async({commit}, formatData) => {
        try {
            const response = await comicService.filterComicByGenre(formatData);
            const comics = response.comics.data;
            comics.forEach((comic) => {
                comic.chapter_latest.created_at = formatDate(comic.chapter_latest.created_at);
            });
            commit('setDataFilter', {
                comics,
                lastPage: response.comics.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
}