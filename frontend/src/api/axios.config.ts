import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    timeout: 10000
})

httpService.interceptors.response.use(
    (res) => { return res },
    (err) => { return Promise.reject(err) }
)