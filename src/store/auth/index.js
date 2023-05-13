import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const state = {
    user: {},
    isLoggingIn: false,
    loginError: null,
    registerError: null,
}

const module = {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
}

export default module;