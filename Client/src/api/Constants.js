import axiosInstance from './axiosInstance';

const apiConstants = {
    admin:{
        login: async (data) => await axiosInstance.post('/admin/login', data),
        registerUser: async (data) => await axiosInstance.post('/admin/register', data),
    },
    product:{
        productList: async () => await axiosInstance.get('/products'),
        addProduct: async (data) => await axiosInstance.post('/products/add',data),
    },
    user:{
        sentOtp: async (data) => await axiosInstance.post('/sent-otp',data),
        login: async (data) => await axiosInstance.post('/login',data),
    }
};

export default apiConstants;
