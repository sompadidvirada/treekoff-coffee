import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const getBoardDetail = () => {
    return axios.get(`${URL}/manageboarddetail/getboarddetail`, {
        withCredentials: true
    })
}

export const updateBoardDetail = (id: number, form: FormData) => {
    return axios.put(`${URL}/manageboarddetail/updateboarddetail/${id}`, form, {
        withCredentials:true
    })
}
