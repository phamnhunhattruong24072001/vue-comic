import commentApi from '@/api/comment';
import { formatImage, formatDate, checkLogin, userLogin } from "@/helpers/index";

const getDefaultState = () => {
    return {
        comments: [],
        message: '',
        thisPage: 1,
        lastPage: '',
        userLogin: userLogin(),
        checkLogin: checkLogin(),
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
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
    },
    actions: {
        getData: async ({ commit } , { comicId,  page }) => {
            await commentApi.getComment(comicId, page)
            .then((response) => {
                const comments = response.data.data.comments;
                comments.data.forEach((item) => {
                    item.created_at = formatDate(item.created_at);
                    item.avatar = formatImage(item.avatar);
                });
                commit('setData', {
                    comments: comments.data,
                    thisPage: page,
                    lastPage: comments.last_page
                });
            })
            .catch((error) => {
                console.log(error);
            })
        },
        addData: async ({commit}, formData) => {
            await commentApi.addComment(formData)
            .then(() => {
                commit('setMessage', {
                    message: '',
                });
            })
            .catch((error) => {
                console.log(error)
            })
        },
        addDataComment({ commit, state }, comment) {
            if (state.thisPage == 1) {
                comment.created_at = formatDate(comment.created_at)
                comment.avatar = formatImage(comment.avatar)
                const newComment = [].concat(comment, state.comments);
                commit('setComment', {
                    comments: newComment,
                });
            }
        }
    },
}