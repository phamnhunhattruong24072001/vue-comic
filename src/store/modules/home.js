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
        setComicNew(state, comicNew) {
            state.comicNew = comicNew;
        },
        setComicCommingSoon(state, comicComingSoon) {
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
                commit('setComicNew', comic_new)
                commit('setComicCommingSoon', comic_coming_soon)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
}