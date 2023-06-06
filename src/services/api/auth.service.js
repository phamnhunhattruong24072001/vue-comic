import axiosService from "../axiosService";
// import { get } from "lodash";

export default {
    async register(data) {
        return axiosService.post(`/auth/register`, data);
    },
    async login(data) {
        return await axiosService.post(`/auth/login`, data);
    },
    async logout() {
        return axiosService.post(`/auth/logout`);
    },
};
