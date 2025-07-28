


import axios from 'axios';

const useAxiosSecure = () => {
  const instance = axios.create({
    // baseURL: 'https://tourism-management-server-two-amber.vercel.app', 
    baseURL: 'http://localhost:5000', 
  });

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;

};

export default useAxiosSecure;
