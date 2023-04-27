import pageApi from '@/api/page';
import { formatDate } from "@/helpers/index";

const getDefaultState = () => {
    return {
        comics: [],
        filter: {
            genres: {},
            countries: {},
            categories: {},
            soft: 'DESC',
        },
        lastPage: 0,
        genre: {},
        country: {},
        category: {},
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {
        
    },
    mutations: {
        setDataGenre(state, payload) {
            state.comics = payload.comics;
            state.genre = payload.genre;
            state.filter.genres = payload.genres;
            state.lastPage = payload.lastPage;
        },
        setDataCountry(state, payload) {
            state.comics = payload.comics;
            state.country = payload.country;
            state.filter.countries = payload.countries;
            state.lastPage = payload.lastPage;
        },
        setDataCategory(state, payload) {
            state.comics = payload.comics;
            state.category = payload.category;
            state.filter.categories = payload.categories;
            state.lastPage = payload.lastPage;
        },
        setDataFilter(state, payload) {
            state.comics = payload.comics;
            state.lastPage = payload.lastPage;
        },
        setDataAllComic(state, payload) {
            state.comics = payload.comics;
            state.filter.countries = payload.countries;
            state.filter.categories = payload.categories;
            state.filter.genres = payload.genres;
            state.lastPage = payload.lastPage;
        }
    },
    actions: {
        getDataGenre: async ({ commit } , slug) => {
            await pageApi.getComicByGenre(slug)
            .then((response) => {
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
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getDataCountry: async ({ commit } , slug) => {
            await pageApi.getComicByCountry(slug)
            .then((response) => {
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
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getDataCategory: async ({ commit } , slug) => {
            await pageApi.getComicByCategory(slug)
            .then((response) => {
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
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getAllComic: async ({ commit }) => {
            await pageApi.getComic()
            .then((response) => {
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
            })
            .catch((error) => {
                console.log(error);
            })
        },
        filterData: async({commit}, formatData) => {
            await pageApi.filterComicByGenre(formatData)
            .then((response) => {
                const comics = response.data.data.comics.data;
                comics.forEach((comic) => {
                    comic.chapter_latest.created_at = formatDate(comic.chapter_latest.created_at);
                });
                commit('setDataFilter', {
                    comics,
                    lastPage: response.data.data.comics.last_page
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}