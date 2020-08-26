import axios from 'axios';
import store from '../store';

axios.defaults.baseURL = process.env.REACT_APP_ENV === 'development' ? 'https://nadabot-drf.herokuapp.com/rest-auth' : 'https://nadabot-drf.herokuapp.com/rest-auth';
axios.interceptors.request.use(
    async (config) => {
        const token = await store.getState().auth.token;
        if (token) config.headers.Authorization = `Token ${token}`;
        return config;
    },
    (error) => { return Promise.reject(error) }
);

const authenticatedGet = (url, options = {}) => {
    return axios.get(url, options);
}

const authenticatedDelete = (url, options={}) => {
    return axios.delete(url, options);
}

const authenticatedPost = (url, data, options={}) => {
    return axios.post(url, data, options);
}

const authenticatedPatch = (url, data, options={}) => {
    return axios.patch(url, data, options);
}

const unauthenticatedPost = (url, data, options={}) => {
    return axios.post(url, data, options);
}

const unauthenticatedPut = (url, data, options = {}) => {
    return axios.put(url, data, options);
}

export {
    unauthenticatedPost,
    unauthenticatedPut,
    authenticatedGet,
    authenticatedPost,
    authenticatedPatch,
    authenticatedDelete
};