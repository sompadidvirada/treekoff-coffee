import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const sendLogin = (form: { phone: string; password: string }) => {
  return axios.post(`${URL}/login`, form, {
    withCredentials: true,
  });
};

export const VerifyCookie = () => {
  return axios.get(`${URL}/verifysession`, {
    withCredentials: true,
  });
};


export const Logoutss = () => {
  return axios.post(`${URL}/logout`, {}, {
    withCredentials: true
  })
}