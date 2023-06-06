import clientService from "@/services/api/client.service";

export default {
    checkFavorite: async ({commit, state}, slugComic) => {
        if(state.checkLogin){
            try {
                const response = await clientService.checkFavoriteApi(state.userLogin.id, slugComic);
                if(response.code === 200) {
                    commit('setFavorite', {
                        is_favorite: true,
                    });
                }else{
                    commit('setFavorite', {
                        is_favorite: false,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    addFavorite: async ({commit}, data) => {
        try {
            await clientService.addFavorite(data)
            commit('setFavorite', {
              is_favorite: true,
            });
        } catch (error) {
            console.log(error);
        }
    },
    removeFavorite: async ({commit}, data) => {
        try {
            await clientService.removeFavorite(data);
            commit('setFavorite', false);
        } catch (error) {
            console.log(error);
        }
    },
    getListFavorite: async ({commit, state}) => {
        if(state.checkLogin) {
            try {
                const response = await clientService.getListFavorite(state.userLogin.id);
                commit('setData', response.clients.favorites);
            } catch (error) {
                console.log(error);
            }
        }
    },
    checkFollow: async ({commit, state}, slugComic) => {
        if(state.checkLogin){
            try {
                const response = await clientService.checkFollowApi(state.userLogin.id, slugComic);
                if(response.code == 200) {
                    commit('setFollow', {
                        is_follow: true,
                    });
                }else{
                    commit('setFollow', {
                        is_follow: false,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    addFollow: async ({commit}, data) => {
        try {
            await clientService.addFollow(data)
            commit('setFollow', {
              is_follow: true,
            });
        } catch (error) {
            console.log(error);
        }
    },
    removeFollow: async ({commit}, data) => {
        try {
            await clientService.removeFollow(data);
            commit('setFollow', false);
        } catch (error) {
            console.log(error);
        }
    },
    getListFollow: async ({commit, state}) => {
        if(state.checkLogin) {
            try {
                const response = await clientService.getListFollow(state.userLogin.id);
                commit('setDataFollow', response.clients.follows);
            } catch (error) {
                console.log(error);
            }
        }
    },
}