export default {
    setData(state, payload) {
        state.comic = payload.comic;
        state.chapter_detail = payload.chapter_detail;
        state.images = payload.images;
        state.preChapter = payload.preChapter;
        state.nextChapter = payload.nextChapter;
    },
}