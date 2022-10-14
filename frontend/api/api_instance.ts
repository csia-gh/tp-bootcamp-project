import axios from "axios";

// console.log(process.env.API_URL)

const api_instance = axios.create({
  baseURL: 'http://127.0.0.1:4800/api/v1/',
});

export default api_instance;