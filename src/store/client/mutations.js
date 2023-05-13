export default {
    setData(state, payload) {
        state.comic_favorite = payload;
    },
    setDataFollow(state, payload) {
        state.comic_follow = payload;
    },
    setFavorite(state, payload) {
        state.is_favorite = payload.is_favorite;
    },
    setFollow(state, payload) {
        state.is_follow = payload.is_follow;
    }
}