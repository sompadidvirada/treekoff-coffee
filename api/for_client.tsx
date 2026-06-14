import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const getHomeCoverImageForClient = () => {
    return axios.get(`${URL}/gethomecoverimage`)
}

export const getRecomMenu = () => {
    return axios.get(`${URL}/getrecomemndmenu`)
}

export const getAllDataHomePage = () => {
    return axios.get(`${URL}/user/getalldata`)
}

export const getAllBranchs = () => {
    return axios.get(`${URL}/user/getallbranchs`)
}