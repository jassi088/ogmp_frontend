import { axiosInstance } from "./axiosInstance";


// registerUser
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/register', payload);
        return response.data;

    } catch (error) {
        return error.message;
    }
}



// registerUser
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;

    } catch (error) {
        return error.message;
    }
}


// getCurrentUser
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-current-user');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// get all users
export const GetAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-all-users');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// get all users
export const UpdateUserStatus = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/users/update-user-status/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}