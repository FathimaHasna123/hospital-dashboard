import { apiClient } from "../api";


export const getDepartment = () => {
    return apiClient.get('departmentApi')
}

 export const createDepartment = (data) => {
    return apiClient.post('departmentApi/', data)
 }


export const updateDepartment = (data) => {
    return apiClient.put(`/departmentApi/${data.id}`, data.data)
}

export const deleteDepartment = (id) => {
    return apiClient.delete(`/departmentApi/${id}`)
}
