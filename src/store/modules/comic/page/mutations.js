export default {
    setDataGenre(state, payload) {
        state.comics = payload.comics;
        state.genre = payload.genre;
        state.filter.genres = payload.genres;
        state.lastPage = payload.lastPage;
    },
    setDataCountry(state, payload) {
        state.comics = payload.comics;
        state.country = payload.country;
        state.filter.countries = payload.countries;
        state.lastPage = payload.lastPage;
    },
    setDataCategory(state, payload) {
        state.comics = payload.comics;
        state.category = payload.category;
        state.filter.categories = payload.categories;
        state.lastPage = payload.lastPage;
    },
    setDataFilter(state, payload) {
        state.comics = payload.comics;
        state.lastPage = payload.lastPage;
    },
    setDataAllComic(state, payload) {
        state.comics = payload.comics;
        state.filter.countries = payload.countries;
        state.filter.categories = payload.categories;
        state.filter.genres = payload.genres;
        state.lastPage = payload.lastPage;
    }
}