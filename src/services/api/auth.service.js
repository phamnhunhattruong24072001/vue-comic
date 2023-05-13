import axiosService from "../axiosService";
import { get } from "lodash";

export default {
    async register(data) {
        return axiosService.post(`/auth/register`, data);
    },
    async login(data) {
        const response = await axiosService.post(`/auth/login`, data);
        return get(response, "data", []);
    },
    async logout() {
        return axiosService.post(`/auth/logout`);
    },
};
