import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const AddNews = (form: FormData) => {
    return axios.post(`${URL}/managenews/addnews`, form, {
        withCredentials: true
    })
}

export const GetAllNews = (form : {page: number, limit : number}) => {
    return axios.post(`${URL}/managenews/getallnews`, form, {
        withCredentials:true
    })
}

export const UpdateNews = (form: FormData, id:number) => {
    return axios.put(`${URL}/managenews/updatenews/${id}`, form, {
        withCredentials:true
    })
}

export const deleteNews = (id : number) => {
    return axios.delete(`${URL}/managenews/deletenews/${id}`, {
        withCredentials: true
    })
}

export const updatePinNews = (id : number, form : {status: boolean}) => {
    return axios.patch(`${URL}/managenews/updatepinnews/${id}`, form, {
        withCredentials: true
    })
}


// for client 


export const getAllNewsHomePage = () => {
    return axios.get(`${URL}/managenews/getallnewshomepage`)
}

export const fecthSigleNewForClient = (id:string) => {
    return axios.get(`${URL}/managenews/getnewbyid/${id}`)
}

export const getAllNews = (limit: number, page: number) => {
    return axios.get(`${URL}/managenews/getallnewsdetail?limit=${limit}&page=${page}`)
}