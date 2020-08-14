import axios from 'axios'
const baseUrl = 'http://45.63.123.94/';
const request = axios.create({
    baseUrl: baseUrl
});
export {
	request,
	baseUrl
}