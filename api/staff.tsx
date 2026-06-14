import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const UpdateRoleAndAvailable = (form : { role: string, available: boolean},id: number) => {
    return axios.put(`${URL}/managestaff/editroleandavailable/${id}`, form, {
        withCredentials: true
    })
}

export const ClearPasswordStaffByAdmin = (id: number) => {
    return axios.patch(`${URL}/managestaff/clearpasswordstaff/${id}`, {}, {
        withCredentials:true
    })
}

export const DeleteStaffApi = (id:number) => {
    return axios.delete(`${URL}/managestaff/deletestaff/${id}`, {
        withCredentials: true
    })
}

export const ChangePasswordStaff = (form:{ old_password: string, new_password: string}) => {
    return axios.post(`${URL}/managestaff/updatestaffpassword`, form, {
        withCredentials: true
    })
}