export default {
    setData(state, payload) {
        state.comments = payload.comments;
        state.thisPage = payload.thisPage;
        state.lastPage = payload.lastPage;
    },
    setMessage(state, payload) {
        state.message = payload.message;
    },
    setComment(state, payload) {
        state.comments = payload.comments;
    }
}