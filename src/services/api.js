import axios from 'axios';

let connect = {
	baseURL: "https://integerservice.herokuapp.com/"
}

const api = axios.create({
	baseURL: connect.baseURL,
});

export default api;