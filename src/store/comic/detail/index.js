import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const getDefaultState = () => {
    return {
        comic: [],
        figures: [],
        chapters: [],
        newChapter: [],
        latestChapter: [],
        genres: [],
        country: [],
        category: [],
        showChapter: true,
        commentTotal: 0,
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