import authApi from '@/api/auth';

export default {
    namespaced: true,
    state: {
        user: {},
        isLoggingIn: false,
        loginError: null,
        registerError: null,
        
    },
    getters: {
        user: (state) => state.user,
        isLoggingIn: (state) => state.isLoggingIn,
        loginError: (state) => state.loginError,
        registerError: (state) => state.registerError,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_LOGGING_IN(state, isLoggingIn) {
            state.isLoggingIn = isLoggingIn;
        },
        SET_LOGGING_ERROR(state, error) {
            state.loginError = error;
        },
        SET_REGISTER_ERROR(state, error) {
            state.registerError = error;
        }
    },
    actions: {
        login({commit}, formData) {
            commit('SET_LOGGING_IN', true);
            return authApi.login(formData)
                .then((response) => {
                    commit('SET_USER', response.data.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                })
                .catch((error) => {
                    commit('SET_LOGGING_ERROR', error.response.data.message)
                })
        },
        register({commit}, formData) {
            commit('SET_REGISTER_ERROR', false)
            return authApi.register(formData)
                .then((response) => {
                    if(response.status == 200) {
                        this.$router.push({name: 'login'})
                    }else{
                        console.log(response.status);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    module: {

    }
}