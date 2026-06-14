import axios from 'axios';
const URL = import.meta.env.VITE_URL_API



export const CreateJobDescription = (form: {name_lao: string, name_eng: string}) => {
    return axios.post(`${URL}/managejobrequire/createjobdescription`, form, {
        withCredentials: true
    })
}

export const GetAllJobDescription = () => {
    return axios.get(`${URL}/managejobrequire/getalljobdescription`, {
        withCredentials: true
    })
}

export const  EditJopDescription = (id:number, form:{name_lao:string, name_eng:string}) => {
    return axios.put(`${URL}/managejobrequire/editjobdescription/${id}`, form, {
        withCredentials: true
    })
}

export const DeleteJobDescription = (id: number) => {
    return axios.delete(`${URL}/managejobrequire/deletejobdescription/${id}`, {
        withCredentials: true
    })
}

export const AddJobRequireApi = (form: {jop_description_id: number, branches_id: number, require_number: number, contact_number: string, job_level: string}) => {
    return axios.post(`${URL}/managejobrequire/addjobrequire`, form, {
        withCredentials: true
    })
}

export const GetAllJobRequire = () => {
    return axios.get(`${URL}/managejobrequire/getalljobrequire`, {
        withCredentials: true
    })
}

export const EditJobRequireApi = (id:number, form:any) => {
    return axios.put(`${URL}/managejobrequire/editjobrequire/${id}`, form, {
        withCredentials: true
    })
}

export const UpdateStautsJobRequire = (id:number, form : {status : boolean}) => {
    return axios.patch(`${URL}/managejobrequire/updatstatusjobrequire/${id}`, form, {
        withCredentials: true
    })
}

export const GetAllJobRequireClient = () => {
    return axios.get(`${URL}/getjobrequire`)
}

export const JoRequireInterest = (form:{job_id: number}) => {
    return axios.post(`${URL}/client/jobrequireinteres`, form)
}