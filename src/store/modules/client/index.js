import { checkLogin, userLogin } from "@/helpers/index";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const getDefaultState = () => {
    return {
        userLogin: userLogin(),
        checkLogin: checkLogin(),
        is_favorite: false,
        is_follow: false,
        comic_favorite: [],
        comic_follow: [],
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