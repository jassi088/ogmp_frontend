import { axiosInstance } from "./axiosInstance";


// add a new notification
export const AddNotification = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/notifications/notify', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// add all notifications by user
export const GetNotifications = async (payload) => {
    try {
        const response = await axiosInstance.get('/api/notifications/get-all-notifications', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// delete notification
export const DeleteNotification = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/notifications/delete-notification/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// delete notification
export const ReadAllNotifications = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/notifications/read-all-notifications', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};