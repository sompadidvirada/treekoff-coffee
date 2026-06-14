import axios from 'axios';
const URL = import.meta.env.VITE_URL_API

export const getAllStaff = () => {
    return axios.post(`${URL}/managestaff/getallstaff`)
}

export const createStaff = (form: FormData) => {
    return axios.post(`${URL}/managestaff/createstaff`, form)
}

export const uploadHomeCoverImage = (form: FormData) => {
    return axios.post(`${URL}/homecoverimage/addimage`, form, {
        withCredentials:true
    })
}

export const getAllHomeCoverImage = () => {
    return axios.get(`${URL}/homecoverimage/getallhomecoverimage`, {
        withCredentials:true
    })
}

export const deleteHomeCoverImage = (id:number) => {
    return axios.delete(`${URL}/homecoverimage/deletecoverimage/${id}`, {
        withCredentials: true
    })
}



export const UpdatStatusHomeCoverImage = (id: number, form :{status: boolean}) => {
    return axios.patch(`${URL}/homecoverimage/updatestatus/${id}`, form, {
        withCredentials:true
    })
}
