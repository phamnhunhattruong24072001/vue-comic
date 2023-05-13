export default {
    setData(state, payload) {
        state.genres = payload.genres;
        state.countries = payload.countries;
        state.categories = payload.categories;
    },
    setDataSearch(state, payload) {
        state.resultSearch = payload.resultSearch;
    },
}