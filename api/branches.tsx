import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const getAllProvince = () => {
    return axios.get(`${URL}/managebranch/getallprovince`)
}

export const addBranch = ( form : FormData) => {
    return axios.post(`${URL}/managebranch/addbranch`, form, {
        withCredentials: true
    })
}

export const getAllBranchess = (limit: number, page: number) => {
    return axios.get(`${URL}/managebranch/getallbranches?page=${page}&limit=${limit}`, {
        withCredentials: true
    })
}

export const editBranch = (form: FormData, id: number) => {
    return axios.put(`${URL}//managebranch/editbranch/${id}`, form, {
        withCredentials: true
    })
}

export const deleteBranch = (id: number) => {
    return axios.delete(`${URL}/managebranch/deletebranch/${id}`, {
        withCredentials: true
    })
}

export const updateScoreBranch = (id: number, form : { score: number}) => {
    return axios.patch(`${URL}/managebranch/updatescore/${id}`, form, {
        withCredentials: true
    })
}

export const getAllBranchForSelect = () => {
    return axios.get(`${URL}/managebranch/getallbranchesforselect`, {
        withCredentials: true
    })
}