import axiosService from "../axiosService";
import { get } from "lodash";

export default {
    async addComment(formData)
    {
        const response = await axiosService.post(`/comment`, formData);
        return get(response, "data", []);
    },
    async getComment(comicId, page)
    {
        const response = await axiosService.get(`/comment/get-list/${comicId}?page=${page}`);
        return get(response, "data", []);
    },
}