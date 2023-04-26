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
        checkFavorite: async ({commit, state}, comicId) => {
            if(state.checkLogin){
                await clientApi.checkFavoriteApi(state.userLogin.id, comicId)
                .then((response) => {
                    if(response.data.code == 200) {
                        commit('setFavorite', {
                            is_favorite: true,
                        });
                    }else{
                        commit('setFavorite', {
                            is_favorite: false,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        addFavorite: async ({commit}, data) => {
            await clientApi.addFavorite(data)
            .then(() => {
                commit('setFavorite', {
                    is_favorite: true,
                });
            })
            .catch((error) => {
                console.log(error)
            })
        },
        removeFavorite: async ({commit}, data) => {
            await clientApi.removeFavorite(data)
            .then(() => {
                commit('setFavorite', false);
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getListFavorite: async ({commit}, clientId) => {
            await clientApi.getListFavorite(clientId)
            .then((response) => {
                commit('setData', response.data.data.comics);
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
}