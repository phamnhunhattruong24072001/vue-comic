import comicService from "@/services/api/comic.service";
import { formatDate } from '@/helpers/index';

export default {
    getDataGenre: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByGenre(slug);
            const comics = response.data.data.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataGenre', {
                comics: comics,
                genres: response.data.data.genres,
                genre: response.data.data.genre,
                lastPage: response.data.data.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getDataCountry: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByCountry(slug);
            const comics = response.data.data.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataCountry', {
                comics: comics,
                countries: response.data.data.countries,
                country: response.data.data.country,
                lastPage: response.data.data.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getDataCategory: async ({ commit } , slug) => {
        try {
            const response = await comicService.getComicByCategory(slug);
            const comics = response.data.data.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataCategory', {
                comics: comics,
                categories: response.data.data.categories,
                category: response.data.data.category,
                lastPage: response.data.data.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAllComic: async ({ commit }) => {
        try {
            const response = await comicService.getComic();
            const comics = response.data.data.comics.data;
            comics.forEach((item) => {
                item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
            });
            commit('setDataAllComic', {
                comics: comics,
                categories: response.data.data.categories,
                countries: response.data.data.countries,
                genres: response.data.data.genres,
                lastPage: response.data.data.comics.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    },
    filterData: async({commit}, formatData) => {
        try {
            const response = await comicService.filterComicByGenre(formatData);
            const comics = response.data.data.comics.data;
            comics.forEach((comic) => {
                comic.chapter_latest.created_at = formatDate(comic.chapter_latest.created_at);
            });
            commit('setDataFilter', {
                comics,
                lastPage: response.data.data.comics.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
}