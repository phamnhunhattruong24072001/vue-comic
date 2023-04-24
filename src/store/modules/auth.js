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
        setUser(state, user) {
            state.user = user;
        },
        setLoggingIn(state, isLoggingIn) {
            state.isLoggingIn = isLoggingIn;
        },
        setLoggingError(state, error) {
            state.loginError = error;
        },
        setRegisterError(state, error) {
            state.registerError = error;
        }
    },
    actions: {
        async login({commit}, formData) {
            commit('SET_LOGGING_IN', true);
            return await authApi.login(formData)
                .then((response) => {
                    commit('setUser', response.data.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                })
                .catch((error) => {
                    commit('setLoggingError', error.response.data.message)
                })
        },
        async register({commit}, formData) {
            commit('SET_REGISTER_ERROR', false)
            return await authApi.register(formData)
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
}