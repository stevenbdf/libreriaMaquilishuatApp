import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.7/libreria-maquilishuat/core/api/',
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

export default instance;