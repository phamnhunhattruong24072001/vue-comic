import componentApi from '@/api/component';

const getDefaultState = () => {
    return {
        genres: [],
        user: [],
        is_login: false,
        search: {
            result: {},
            text: '',
        },
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            
        },
    },
    actions: {
        getData: async ({ commit }) => {
            await componentApi.getHeader()
            .then((response) => {
                commit('setData', {
                    
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}