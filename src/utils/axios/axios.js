import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://35.229.86.167/core/api/',
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

export default instance;