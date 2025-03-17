import { apiClient } from "../api";


export const getDoctors = () => {
    return apiClient.get('doctorsApi')
}

 export const createDoctors = (data) => {
    return apiClient.post('doctorsApi/', data)
 }


export const updateDoctors = (data) => {
    return apiClient.put(`/doctorsApi/${data.id}`, data.data)
}

export const deleteDoctors = (id) => {
    return apiClient.delete(`/doctorsApi/${id}`)
}

