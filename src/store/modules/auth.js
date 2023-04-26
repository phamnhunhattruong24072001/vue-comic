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
            commit('setLoggingIn', true);
            return await authApi.login(formData)
                .then((response) => {
                    commit('setUser', response.data.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                    localStorage.setItem('access_token', response.data.data.access_token);
                })
                .catch((error) => {
                    commit('setLoggingError', error)
                });
        },
        async register({commit}, formData) {
            commit('setRegisterError', false)
            return await authApi.register(formData)
                .then((response) => {
                    if(response.status == 200) {
                        console.log(response.status);
                    }else{
                        console.log(response.status);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        async logout() {
            return await authApi.logout()
                .then(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("access_token");
                    location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
}