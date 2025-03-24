import { apiClient } from "../api";


export const getDoctors = () => {
    return apiClient.get('doctorsApi/')
}

 export const createDoctors = (data) => {
    return apiClient.post('/doctorsApi/', data,{
        headers:{
            "Content-Type":"multipart/formdata"
        }
    })
 }


 export const updateDoctors = (data) => {
    return apiClient.put(`/doctorsApi/${data.id}`,data.data,{
        headers:{
             "Content-Type":"multipart/formdata"
        }
    })
}


export const deleteDoctors = (id) => {
    return apiClient.delete(`/doctorsApi/${id}`)
}

