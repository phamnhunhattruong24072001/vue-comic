import axiosService from "../axiosService";
import { get } from "lodash";

export default {
    async getHeader()
    {
        const response = await axiosService.get(`/component/header`);
        return get(response, "data", []);
    },
    async search(formData)
    {
        const response = await axiosService.post(`/component/search`, formData);
        return get(response, "data", []);
    }
}