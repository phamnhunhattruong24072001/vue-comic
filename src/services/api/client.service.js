import axiosService from "../axiosService";
import { get } from "lodash";

export default {
    async addFavorite(data)
    {
        const response = await axiosService.post(`/client/add-favorite`, data);
        return get(response, "data", []);
    },
    async removeFavorite(data)
    {
        const response = await axiosService.post(`/client/remove-favorite`, data);
        return get(response, "data", []);
    },
    async getListFavorite(clientId)
    {
        const response = await axiosService.get(`/client/get-list-favorite/${clientId}`);
        return get(response, "data", []);
    },
    async checkFavoriteApi(clientId, $comcicId)
    {
        const response = await axiosService.get(`/client/check-favorite/${clientId}/${$comcicId}`);
        return get(response, "data", []);
    },

    async addFollow(data)
    {
        const response = await axiosService.post(`/client/add-follow`, data);
        return get(response, "data", []);
    },
    async removeFollow(data)
    {
        const response = await axiosService.post(`/client/remove-follow`, data);
        return get(response, "data", []);
    },
    async getListFollow(clientId)
    {
        const response = await axiosService.get(`/client/get-list-follow/${clientId}`);
        return get(response, "data", []);
    },
    async checkFollowApi(clientId, $comcicId)
    {
        const response = await axiosService.get(`/client/check-follow/${clientId}/${$comcicId}`);
        return get(response, "data", []);
    }
}