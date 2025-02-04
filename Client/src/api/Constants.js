import axiosInstance from './axiosInstance';

const apiConstants = {
    admin:{
        login: async (data) => await axiosInstance.post('/admin/login', data),
        registerUser: async (data) => await axiosInstance.post('/admin/register', data),
    },
    product:{
        productList: async () => await axiosInstance.get('/products'),
        createProduct: async (data) => await axiosInstance.post('/products/create-product',data),
        createCategory: async (data) => await axiosInstance.post('/products/create-category',data),
    },
    user:{
        sentOtp: async (data) => await axiosInstance.post('/sent-otp',data),
        login: async (data) => await axiosInstance.post('/login',data),
    },
    upload:{
        image: async (data) => await axiosInstance.post('/upload-image',data),
    }
};

export default apiConstants;
