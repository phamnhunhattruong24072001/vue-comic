import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('access_token');

export default {
    async addFavorite(data)
    {
        return await axios.post(`${API_URL}/client/add-favorite`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async removeFavorite(data)
    {
        return await axios.post(`${API_URL}/client/remove-favorite`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async getListFavorite(clientId)
    {
        return await axios.get(`${API_URL}/client/get-list-favorite/${clientId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async checkFavoriteApi(clientId, $comcicId)
    {
        return await axios.get(`${API_URL}/client/check-favorite/${clientId}/${$comcicId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },

    async addFollow(data)
    {
        return await axios.post(`${API_URL}/client/add-follow`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async removeFollow(data)
    {
        return await axios.post(`${API_URL}/client/remove-follow`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async getListFollow(clientId)
    {
        return await axios.get(`${API_URL}/client/get-list-follow/${clientId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    async checkFollowApi(clientId, $comcicId)
    {
        return await axios.get(`${API_URL}/client/check-follow/${clientId}/${$comcicId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    }
}