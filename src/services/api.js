import axios from 'axios';
import connection from './connection.json';

const api = axios.create({
	baseURL: connection.baseURL,
});

export default api;