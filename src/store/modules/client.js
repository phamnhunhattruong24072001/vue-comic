import clientApi from '@/api/client';
import { checkLogin, userLogin } from "@/helpers/index";

const getDefaultState = () => {
    return {
        userLogin: userLogin(),
        checkLogin: checkLogin(),
        is_favorite: false,
        comic_favorite: [],
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            state.comic_favorite = payload.comic_favorite;
        },
        setFavorite(state, payload) {
            state.is_favorite = payload.is_favorite;
        }
    },
    actions: {
        checkFavorite: async ({commit}, {clientId, comicId}) => {
            clientApi.checkFavorite(clientId, comicId)
            .then(() => {
                commit('setFavorite', true);
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
}