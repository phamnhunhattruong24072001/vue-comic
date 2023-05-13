import layoutService from "@/services/api/layout.service";

export default {
    getData: async ({ commit }) => {
        try {
            const response = await layoutService.getHeader();
            commit('setData', {
                genres: response.genres,
                countries: response.countries,
                categories: response.categories,
            })
        } catch (error) {
            console.log(error);
        }
    },
    getDataSearch: async ({commit}, params) => {
        try {
            const response = await layoutService.search(params);
            if(params.search.trim().length == 0) {
                commit('setDataSearch', {
                    resultSearch: [],
                });
            }else{
                commit('setDataSearch', {
                    resultSearch: response.comics,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
}