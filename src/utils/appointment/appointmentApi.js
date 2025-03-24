import { apiClient } from "../api"



export const getAppointment = ()=>{
    return apiClient.get('/appointments/')
}


