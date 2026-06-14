import axios from 'axios';
const URL = import.meta.env.VITE_URL_API



export const updateOurservice = (form : FormData) => {
    return axios.post(`${URL}/manageourservice`, form, {
        withCredentials:true
    })
}