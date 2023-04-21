import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/slices/loaderSlice';
import { GetAllUsers, UpdateUserStatus } from '../../apiCalls/users';
import moment from 'moment';

const Users = () => {

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateUserStatus(id, { status });
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
                return record.role.toUpperCase();
            }
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                const { status, _id } = record;
                return (<div className="flex gap-3">

                    {status === 'active' && <span className='underline cursor-pointer text-rose-500' onClick={() => onStatusUpdate(_id, 'blocked')}>Block</span>}

                    {status === 'blocked' && <span className='underline cursor-pointer text-primary' onClick={() => onStatusUpdate(_id, 'active')}>Active</span>}

                </div>)
            }
        },
    ];

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllUsers();
            dispatch(SetLoader(false));
            if (response.success) {
                setUsers(response.data);
            } else {
                message.info(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }



    useEffect(() => {
        getData();
    }, []);

    return (
        <div>

            <Table scroll={{x: 800}} pagination={{ pageSize: 3 }} columns={columns} dataSource={users} rowKey={() => String(Math.floor(Math.random() * 100))} />

        </div>
    )
}

export default Users;