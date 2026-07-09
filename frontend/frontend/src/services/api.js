import axios from "axios";

const API = axios.create({
    baseURL: "https://natural-language-to-sql-engine.onrender-1.com/"
});

export default API;
