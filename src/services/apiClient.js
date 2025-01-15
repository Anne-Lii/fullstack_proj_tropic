import axios from 'axios';

//Create an axios instance with default settings
const apiClient = axios.create({
  baseURL: 'https://projekt-webbtjanst-api-anne-lii.onrender.com',//API base URL
  headers: {
    'Content-Type': 'application/json',//default header for JSON format
  }
});

//Creates a request interceptor to add the token to all requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); //get token from localstorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //Add token to headers
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;  //Export instance
