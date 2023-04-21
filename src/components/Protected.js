import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apiCalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/slices/loaderSlice';
import { SetUser } from '../redux/slices/usersSlice';
import { Badge, Avatar, message, Modal, Button } from 'antd';
import Notifications from './Notifications';
import { GetNotifications, ReadAllNotifications } from '../apiCalls/notifications';

const Protected = ({ children }) => {


    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.users);

    const validateToken = async () => {
        dispatch(SetLoader(true));
        try {
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                dispatch(SetLoader(false));
                navigate('/login');
            }
        } catch (error) {
            dispatch(SetLoader(false));
            navigate('/login');
        }
    };


    const getNotifications = async () => {
        try {
            const response = await GetNotifications({ userId: user?._id });
            if (response.success) {
                setNotifications(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };


    const logout = () => {
        dispatch(SetLoader(true));
        localStorage.removeItem('token');
        dispatch(SetLoader(false));
        navigate('/login');
    }


    const readNotifications = async () => {
        try {
            const response = await ReadAllNotifications({ userId: user?._id });
            if (response.success) {
                getNotifications();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }



    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
            getNotifications();
        } else {
            navigate('/login')
        }
    }, []);


    return (
        user && (
            <div>
                {/* Header */}
                <header className='flex justify-between items-center bg-primary p-6'>
                    <h1 className='select-none text-white cursor-pointer' onClick={() => navigate('/')}>OGMP</h1>
                    <div className='bg-white py-2 px-5 rounded flex items-center gap-1'>
                        {/* User iCOn */}
                        <i className="ri-user-line"></i>
                        {/* user name */}
                        <span className='select-none capitalize underline cursor-pointer' onClick={() => {
                            if (user.role === 'user') {
                                navigate('/profile');
                            } else {
                                navigate('/admin');
                            }
                        }}>
                            {user.name}
                        </span>
                        {/* Notification */}
                        <Badge className='cursor-pointer' size='small' count={notifications?.filter(notification => !notification.read).length} onClick={() => {
                            readNotifications();
                            setShowNotification(true);
                        }}>
                            <Avatar size='small'>
                                <i className="ri-notification-line"></i>
                            </Avatar>
                        </Badge>
                        {/* logout */}
                        <i className="ri-logout-box-r-line ml-6 cursor-pointer" onClick={() => setLogoutModal(true)}></i>
                    </div>
                </header>

                {/* Body */}
                <div className='p-5'>
                    {children}
                </div>


                {
                    showNotification && <Notifications
                        notifications={notifications}
                        reloadNotifications={setNotifications}
                        showNotifications={showNotification}
                        setShowNotifications={setShowNotification}
                    />
                }

                {
                    logoutModal && <Modal closable={false} open={logoutModal} onCancel={() => setLogoutModal(false)} width={400} centered footer={[
                        <Button className='' key="submit" type="primary" onClick={logout}>
                            Yes
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => setLogoutModal(false)}>
                            No
                        </Button>,
                    ]}>

                        <h3 className='text-center text-gray-500 mb-8'>Do you really want to logout? </h3>
                    </Modal>
                }
            </div>
        )
    )
}

export default Protected