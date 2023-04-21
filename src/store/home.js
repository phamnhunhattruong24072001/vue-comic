import pageApi from '@/api/page';
import { formatDate } from '@/helpers/index';

export default {
    namespaced: true,
    state: {
        comicNew: {},
        comicComingSoon: {},
    },
    getters: {
        comicNew: (state) => state.comicNew,
        comicComingSoon: (state) => state.comicComingSoon,
    },
    mutations: {
        SET_COMIC_NEW(state, comicNew) {
            state.comicNew = comicNew;
        },
        SET_COMIC_COMMING_SOON(state, comicComingSoon) {
            state.comicComingSoon = comicComingSoon;
        },
    },
    actions: {
        getData({commit}) {
            pageApi.getDataHomePage()
            .then((response) => {
                const comic_new = response.data.data.comic_new;
                const comic_coming_soon = response.data.data.comic_coming_soon
                comic_new.forEach(item => {
                    item.chapter_latest.created_at = formatDate(item.created_at)
                });
                comic_coming_soon.forEach(item => {
                    item.chapter_latest.created_at = formatDate(item.created_at)
                });
                commit('SET_COMIC_NEW', comic_new)
                commit('SET_COMIC_COMMING_SOON', comic_coming_soon)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    module: {

    }
}