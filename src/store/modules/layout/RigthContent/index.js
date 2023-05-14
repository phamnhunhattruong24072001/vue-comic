import { checkLogin, userLogin } from "@/helpers/index";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const getDefaultState = () => {
    return {
        comments: [],
        message: '',
        thisPage: 1,
        lastPage: '',
        userLogin: userLogin(),
        checkLogin: checkLogin(),
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