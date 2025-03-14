

import { useMutation } from "react-query";
import {  createDepartment, deleteDepartment, updateDepartment } from "./DepartmentApi";




 export const useCreateDepartment =()=>{
     return useMutation((data)=>createDepartment(data))
 }

export const useUpdateDepartment = ()=>{
    return useMutation((data)=>updateDepartment(data))
}

export const useDeleteDepartment = ()=>{
    return useMutation((id)=>deleteDepartment(id))
}