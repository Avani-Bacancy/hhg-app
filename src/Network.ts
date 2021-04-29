import axios from 'axios';
    
const baseUrl = process.env.REACT_APP_API_URL;

export const get = (url: string, params?: object) => {
    return axios.get(baseUrl + url, {
        params: params,
    }).then(response => response.data)
      .catch(() => alert('Sometthing went wrong!'));
};

export const post = (url: string, payload: object) => {
    return axios.post(baseUrl + url, payload).then(response => response.data)
      .catch(() => alert('Sometthing went wrong!'));
};