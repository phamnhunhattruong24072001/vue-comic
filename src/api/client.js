import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('access_token');

export default {
    addFavorite(data)
    {
        return axios.post(`${API_URL}/client/add-favorite`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    removeFavorite(data)
    {
        return axios.post(`${API_URL}/client/remove-favorite`, data, {
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    getListFavorite(clientId)
    {
        return axios.get(`${API_URL}/client/get-list-favorite/${clientId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    },
    checkFavorite(clientId, $comcicId)
    {
        return axios.get(`${API_URL}/client/check-favorite/${clientId}/${$comcicId}`,{
            headers : {
                Authorization: `${TOKEN}`
            },
        });
    }
}