import axios from 'axios';
const URL = import.meta.env.VITE_URL_API

export const GetAllTotalAnalytics = () => {
    return axios.get(`${URL}/manageanlytics/getalltotalanalytics`, {
        withCredentials: true
    })
}

export const GetTotalViewHonePage = () => {
 return axios.get(`${URL}/manageanlytices/gettotalviewdashboard`, {
    withCredentials: true
 })
}

export const GetTotalReadAritcles = () => {
    return axios.get(`${URL}/manageanlytics/getalltotalreadaritcles`, {
        withCredentials: true
    })
}