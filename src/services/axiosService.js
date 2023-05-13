import axios from "axios";

const END_POIN = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('access_token');

const headers = {
    Accept: "application/json",
    "Accept-Language": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": TOKEN,
  };

const axiosService = axios.create({
    baseURL: END_POIN,
    headers
  });

axiosService.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        console.log(error);
    }
)
export default axiosService;