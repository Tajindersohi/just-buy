import axiosInstance from './axiosInstance';

const apiConstants = {
    adminLogin: async (data) => await axiosInstance.post('/auth/login', data),
    registerUser: async (data) => await axiosInstance.post('/auth/register', data),
    productList: async () => await axiosInstance.get('/products'),
};

export default apiConstants;
