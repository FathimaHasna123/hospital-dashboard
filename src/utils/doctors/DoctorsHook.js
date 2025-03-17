import { useMutation } from "react-query"
import { createDoctors, deleteDoctors, updateDoctors } from "./DoctorsApi"




export const useCreateDoctors = ()=>{
    return useMutation((data)=>createDoctors(data))
}

export const useUpdateDoctors = ()=>{
    return useMutation((data)=>updateDoctors(data))
}

export const useDeleteDoctors = ()=>{
    return useMutation((id)=>deleteDoctors(id))
}