import { checkLogin, userLogin } from "@/helpers/index";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

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

const module = {
    namespaced : true,
    state : getDefaultState,
    mutations,
    getters,
    actions,
}

export default module;