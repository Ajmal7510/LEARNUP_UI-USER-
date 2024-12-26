


import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 300000,
});


API.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('token');
    if (token) {
  
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      window.alert('token is not available')
     
      window.location.href = '/login'; 
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);


API.interceptors.response.use(
  (response) => {

    if (response.status === 200 || response.status === 201) {
      console.log('Response Success:', response.data);
    }
    return response;
  },
  (error) => {

    if (error.response) {
        window.alert('something woring ')
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        localStorage.removeItem('token'); 
        window.alert('somthing woring unotherize')
        window.location.href = '/login'; 
      } else if (error.response.status === 400 || error.response.status === 500) {
        console.error('Error Response:', error.response.data);

      }
    }
    return Promise.reject(error);
  }
);

export default API;
