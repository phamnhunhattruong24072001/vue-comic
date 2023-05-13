export default {
    setData(state, payload) {
        state.comic = payload.comic;
        state.figures = payload.figures;
        state.chapters = payload.chapters;
        state.newChapter = payload.newChapter;
        state.latestChapter = payload.latestChapter;
        state.genres = payload.genres;
        state.country = payload.country;
        state.category = payload.category;
        state.commentTotal = payload.commentTotal;
    },
    setShowChapter(state, payload) {
        state.showChapter = payload.showChapter;
    }
}