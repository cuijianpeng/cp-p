import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://45.63.123.94/'
});
export default instance;