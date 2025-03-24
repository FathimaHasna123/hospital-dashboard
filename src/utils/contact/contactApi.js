import { apiClient } from "../api"



export const getContact = ()=>{
    return apiClient.get('/contactApi/')
}

