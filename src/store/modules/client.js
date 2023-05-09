import clientApi from '@/api/client';
import { checkLogin, userLogin } from "@/helpers/index";

const getDefaultState = () => {
    return {
        userLogin: userLogin(),
        checkLogin: checkLogin(),
        is_favorite: false,
        comic_favorite: [],
        comic_follow: [],
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            state.comic_favorite = payload;
        },
        setDataFollow(state, payload) {
            state.comic_follow = payload;
        },
        setFavorite(state, payload) {
            state.is_favorite = payload.is_favorite;
        },
        setFollow(state, payload) {
            state.is_follow = payload.is_follow;
        }
    },
    actions: {
        checkFavorite: async ({commit, state}, comicId) => {
            if(state.checkLogin){
                try {
                    const response = await clientApi.checkFavoriteApi(state.userLogin.id, comicId);
                    if(response.data.code == 200) {
                        commit('setFavorite', {
                            is_favorite: true,
                        });
                    }else{
                        commit('setFavorite', {
                            is_favorite: false,
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        addFavorite: async ({commit}, data) => {
            try {
                await clientApi.addFavorite(data)
                commit('setFavorite', {
                  is_favorite: true,
                });
            } catch (error) {
                console.log(error)
            }
        },
        removeFavorite: async ({commit}, data) => {
            try {
                await clientApi.removeFavorite(data);
                commit('setFavorite', false);
            } catch (error) {
                console.log(error)
            }
        },
        getListFavorite: async ({commit, state}) => {
            if(state.checkLogin) {
                try {
                    const response = await clientApi.getListFavorite(state.userLogin.id);
                    commit('setData', response.data.data.clients.favorites);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        checkFollow: async ({commit, state}, comicId) => {
            if(state.checkLogin){
                try {
                    const response = await clientApi.checkFollowApi(state.userLogin.id, comicId);
                    if(response.data.code == 200) {
                        commit('setFollow', {
                            is_follow: true,
                        });
                    }else{
                        commit('setFollow', {
                            is_follow: false,
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        addFollow: async ({commit}, data) => {
            try {
                await clientApi.addFollow(data)
                commit('setFollow', {
                  is_follow: true,
                });
            } catch (error) {
                console.log(error)
            }
        },
        removeFollow: async ({commit}, data) => {
            try {
                await clientApi.removeFollow(data);
                commit('setFollow', false);
            } catch (error) {
                console.log(error)
            }
        },
        getListFollow: async ({commit, state}) => {
            if(state.checkLogin) {
                try {
                    const response = await clientApi.getListFollow(state.userLogin.id);
                    commit('setDataFollow', response.data.data.clients.follows);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
}