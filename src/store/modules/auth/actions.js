import authService from "@/services/api/auth.service";

export default {
    async login({commit}, formData) {
        commit('setLoggingIn', true);
        try {
            const response = await authService.login(formData);
            commit('setUser', response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('access_token', response.access_token);
        } catch (error) {
            commit('setLoggingError', error)
        }
    },
    async register({commit}, formData) {
        commit('setRegisterError', false)
        try {
            const response = await authService.register(formData);
            if(response.status == 200) {
                console.log(response.status);
            }else{
                console.log(response.status);
            }
        } catch (error) {
            console.log(error)
        }
    },
    async logout() {
        try {
            await authService.logout()
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            location.reload();
        } catch (error) {
            console.log(error)
        }
    }
}