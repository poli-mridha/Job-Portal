import axios from "axios";

const API = axios.create({

    baseURL: "https://job-portal-n1qa.onrender.com/api"

});

export default API;