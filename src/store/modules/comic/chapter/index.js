import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const getDefaultState = () => {
    return {
        chapter_detail: {},
        comic: {},
        images: [],
        preChapter: {},
        nextChapter: {},
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