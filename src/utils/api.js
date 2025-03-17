import axios from "axios"


export const baseUrl = ' http://127.0.0.1:8000/'


export const apiClient = axios.create({
    baseURL:baseUrl,
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
})


