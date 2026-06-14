import axios from 'axios';
const URL = import.meta.env.VITE_URL_API


export const AddCategoryCoffeeMenu = (form: FormData) => {
    return axios.post(`${URL}/managecoffeemenu/addcategory`, form, {
        withCredentials: true
    })
}

export const getAllCategory = ()=> {
    return axios.get(`${URL}/managecoffeemenu/getallcategory`, {
        withCredentials:true
    })
}

export const editCategory = (id:number, form: FormData) => {
    return axios.patch(`${URL}/managecoffeemenu/editcategory/${id}`, form, {
        withCredentials:true
    })
}

export const deleteCategory = (id:number) => {
    return axios.delete(`${URL}/managecoffeemenu/deletecategory/${id}`, {
        withCredentials: true
    })
}


export const addCoffeeMenu = (form: FormData) => {
    return axios.post(`${URL}/managecoffeemenu/addcoffeemenu`, form, {
        withCredentials: true
    })
}

export const getAllCoffeeMenu = () => {
    return axios.get(`${URL}/managecoffeemenu/getallcoffeemenu`, {
        withCredentials:true
    })
}

export const editCoffeeMenu = (id: number, form: FormData) => {
    return axios.put(`${URL}/managecoffeemenu/editcoffeemenu/${id}`, form, {
        withCredentials: true
    })
}

export const deleteCoffeeMenu = (id: number) => {
    return axios.delete(`${URL}/managecoffeemenu/deletecoffeemenu/${id}`, {
        withCredentials: true
    })
}

export const updateRecommendMenu = (form: {is_recommend: boolean}, id: number) => {
    return axios.patch(`${URL}/managecoffeemenu/updaterecommendmenu/${id}`, form, {
        withCredentials: true
    })
}

export const getAllCoffeeMenuCleint = () => {
    return axios.get(`${URL}/getallcoffeemenu`)
}