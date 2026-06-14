import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const UpdateContract = (form :{ address: string, phone: string, email: string, location_url: string}) => {
    return axios.post(`${URL}/managecontact/updatecontact`, form, {
        withCredentials: true
    })
} 

export const GetContactDetail = () => {
    return axios.get(`${URL}/getcontactdetail`)
}