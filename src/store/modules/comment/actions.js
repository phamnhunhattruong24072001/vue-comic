import commentService from "@/services/api/comment.service";
import { formatImage, formatDate} from "@/helpers/index";

export default {
    getData: async ({ commit } , { comicId,  page }) => {
        try {
            const response = await commentService.getComment(comicId, page);
            const comments = response.comments;
            comments.data.forEach((item) => {
                item.created_at = formatDate(item.created_at);
                item.avatar = formatImage(item.avatar);
            });
            commit('setData', {
                comments: comments.data,
                thisPage: page,
                lastPage: comments.last_page
            });
        } catch (error) {
            console.log(error);
        }
    },
    addData: async ({commit}, formData) => {
        try {
            await commentService.addComment(formData) 
            commit('setMessage', {
                message: '',
            });
        } catch (error) {
            console.log(error)
        }
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
}