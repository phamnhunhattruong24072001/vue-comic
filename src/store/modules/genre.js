import pageApi from '@/api/page';
import { formatDate } from "@/helpers/index";

const getDefaultState = () => {
    return {
        comics: [],
        filter: {
            genres: {},
            soft: 'DESC',
        },
        lastPage: 0,
        genre: {},
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            state.comics = payload.comics;
            state.genre = payload.genre;
            state.filter.genres = payload.genres;
            state.lastPage = payload.lastPage;
        },
        setDataFilter(state, payload) {
            state.comics = payload.comics;
            state.lastPage = payload.lastPage;
        }
    },
    actions: {
        getData: async ({ commit } , slug) => {
            await pageApi.getComicByGenre(slug)
            .then((response) => {
                const comics = response.data.data.comics.data;
                comics.forEach((item) => {
                    item.chapter_latest.created_at = formatDate(item.chapter_latest.created_at);
                });
                commit('setData', {
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