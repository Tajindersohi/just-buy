import axiosInstance from '../axiosInstance';

const apiConstants = {
    admin:{
        login: async (data) => await axiosInstance.post('/admin/login', data),
        registerUser: async (data) => await axiosInstance.post('/admin/register', data),
    },
    product:{
        categoryList: async () => await axiosInstance.get('/category'),
        createProduct: async (data) =>
            await axiosInstance.post("/category/create-product", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        updateProduct: async (data) =>
            await axiosInstance.post("/category/update-product", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        createCategory: async (data) => 
            await axiosInstance.post("/category/create-category", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        getCategoryProducts: async (data) => await axiosInstance.post('/category/products',data),
        deleteProduct: async (id) => await axiosInstance.delete(`/category/products/${id}`),
    },
    user:{
        sentOtp: async (data) => await axiosInstance.post('/sent-otp',data),
        login: async (data) => await axiosInstance.post('/login',data),
        getMe: async () => await axiosInstance.post('/me'),
    },
    upload:{
        image: async (data) => await axiosInstance.post('/upload-image',data),
    },
    home:{
        getHome: async () => await axiosInstance.get('/home'),
    }
};

export default apiConstants;
