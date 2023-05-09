import componentApi from '@/api/component';
import {checkLogin, userLogin} from '@/helpers/index';

const getDefaultState = () => {
    return {
        genres: [],
        countries: [],
        categories: [],
        resultSearch: [],
        checkLogin: checkLogin(), 
        userLogin: userLogin(),
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            state.genres = payload.genres;
            state.countries = payload.countries;
            state.categories = payload.categories;
        },
        setDataSearch(state, payload) {
            state.resultSearch = payload.resultSearch;
        },
    },
    actions: {
        getData: async ({ commit }) => {
            try {
                const response = await componentApi.getHeader();
                commit('setData', {
                    genres: response.data.data.genres,
                    countries: response.data.data.countries,
                    categories: response.data.data.categories,
                })
            } catch (error) {
                console.log(error);
            }
        },
        getDataSearch: async ({commit}, params) => {
            try {
                const response = await componentApi.search(params);
                if(params.search.trim().length == 0) {
                    commit('setDataSearch', {
                        resultSearch: [],
                    });
                }else{
                    commit('setDataSearch', {
                        resultSearch: response.data.data.comics,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
}