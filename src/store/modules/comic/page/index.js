import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

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

const module = {
    namespaced : true,
    state : getDefaultState,
    mutations,
    getters,
    actions,
}

export default module;